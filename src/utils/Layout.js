import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from 'react';
import { getCategories } from '../services/CategoryService';
import { getSubCategories } from '../services/SubCategoryService';
import AddBookModal from './AddBookModal';
import shoppingCart from '../resources/img/Shopping_Cart-removebg-preview.png';
import logo from '../resources/img/Logo-removebg-preview.png';
import { useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const Layout = () => {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchCategories = async () => {
    const response = await getCategories();
    // console.log(response);
    setCategories(response);
  };

  const fetchSubCategories = async () => {
    const response = await getSubCategories();
    // console.log(response);
    setSubCategories(response);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <div>
      <Navbar expand='lg' className='bg-body-tertiary' sticky='top'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} alt='Icon' style={{ width: '10rem' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto my-2 my-lg-0 navbarContainer'>
              {categories &&
                categories.map((category) => {
                  return (
                    <NavDropdown
                      title={category.categoryName}
                      key={category.id}
                      id='categoriesScrollingDropdown'
                    >
                      {subCategories &&
                        subCategories.map((subCategory) => {
                          if (subCategory.category.id === category.id) {
                            return (
                              <NavDropdown.Item
                                key={subCategory.id}
                                href={`/subcategories/${subCategory.id}/books`}
                              >
                                {subCategory.subCategoryName}
                              </NavDropdown.Item>
                            );
                          }
                        })}
                    </NavDropdown>
                  );
                })}
              <Nav.Link href='/cart' id='cartIcon'>
                <img src={shoppingCart} alt='Icon' style={{ width: '2rem' }} />
              </Nav.Link>
              <Nav.Link href='/checkout'>CheckOut</Nav.Link>
              <div className='ms-auto btns'>
                <ReButton
                  className='navBarBtns'
                  variant='outline-warning'
                  onClick={() => setModalShow(true)}
                >
                  Add a Book
                </ReButton>

                <ReButton
                  className='navBarBtns'
                  variant='outline-danger'
                  onClick={onOpen}
                >
                  Log Out
                </ReButton>
              </div>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Log Out
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure that you want to log out?{' '}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme='red'
                        onClick={(e) => {
                          onClose();
                          sessionStorage.removeItem('token');
                          sessionStorage.removeItem('username');
                          sessionStorage.removeItem('user_id');
                          localStorage.removeItem('cartItems');
                          localStorage.removeItem('finalCartStats');
                          window.location.href = '/login';
                        }}
                        ml={3}
                      >
                        Log Out
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <AddBookModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                categories={categories != null ? categories : {}}
                subcategories={subCategories != null ? subCategories : {}}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='py-4' id='body'>
        <Outlet />
        {}
      </Container>

      <footer className='white-section' id='footer'>
        <div className='container-fluid'>
          <Link href='https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94/'>
            <i className='social-icon fa-brands fa-twitter fa-2x'></i>
          </Link>

          <Link href='https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94/'>
            <i className='social-icon fa-brands fa-facebook-f fa-2x'></i>
          </Link>

          <Link href='https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94/'>
            <i className='social-icon fa-brands fa-instagram fa-2x'></i>
          </Link>

          <Link href='https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94/'>
            <i className='social-icon fa-solid fa-envelope fa-2x'></i>
          </Link>

          <p className='copyright'>Copyright ©️ 2023 Readers' Nest</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
