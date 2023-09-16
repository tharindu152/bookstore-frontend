import React, { useState, useRef } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import DropDown from './DropDown';
import { addBook, updateBookCoverImage } from '../services/BookService';
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

function AddBookModal(props) {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isbn10, setIsbn10] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [error, setError] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  let id = 0;

  const handleFileChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      author: author,
      description: description,
      price: price,
      quantity: quantity,
      featured: false,
      subCategory: {
        id: subCategoryId,
        category: {
          id: categoryId,
        },
      },
      isbn10: isbn10,
    };

    const coverImageData = {
      coverImage: coverImage,
    };

    console.log(coverImage);

    console.log(data);

    const resBookCreate = await addBook(data);

    if (resBookCreate.message != null) {
      setError(resBookCreate.message);
    } else {
      id = resBookCreate?.id;
      const resCoverImgCreate = await updateBookCoverImage(id, coverImageData);
    }
    console.log(categoryName);
    console.log(subCategoryName);
    console.log(resBookCreate);
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add a Book for Sale
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='addBookForm'>
          <Form onSubmit={handleUpload}>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Title
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='Book Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Author
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='ABC John'
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Description
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='This book is about..?'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                ISBN
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='ISBN'
                  onChange={(e) => setIsbn10(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Price (LKR)
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  type='text'
                  placeholder='xxx'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Quantity
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  type='text'
                  placeholder='xxx'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formFile' className='mb-3'>
              <Form.Label column sm='2'>
                Cover Image
              </Form.Label>
              <Col>
                <Form.Control type='file' onChange={handleFileChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Category
              </Form.Label>
              <Col sm='3'>
                <DropDown
                  items={props.categories}
                  onChange={(e) => {
                    setCategoryId(e.attributes[0].value);
                    setCategoryName(e.innerHTML);
                    // console.log(e.innerHTML);
                  }}
                ></DropDown>
              </Col>
              <Col sm='3'>
                <Form.Label column sm='7'>
                  You Selected :
                </Form.Label>
              </Col>
              <Col sm='3'>
                <Form.Label column sm='12'>
                  {categoryName}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Sub Category
              </Form.Label>
              <Col sm='3'>
                <DropDown
                  items={props.subcategories}
                  onChange={(e) => {
                    setSubCategoryId(e.attributes[0].value);
                    setSubCategoryName(e.innerHTML);
                    // console.log(e.innerHTML);
                  }}
                ></DropDown>
              </Col>
              <Col sm='3'>
                <Form.Label column sm='7'>
                  You Selected :
                </Form.Label>
              </Col>
              <Col sm='3'>
                <Form.Label column sm='12'>
                  {subCategoryName}
                </Form.Label>
              </Col>
            </Form.Group>
            <Modal.Footer>
              <ReButton
                onClick={(e) => {
                  onOpen();
                }}
                className='btnCheckout'
                type='submit'
              >
                Add for Sale
              </ReButton>

              {error && (
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Error
                      </AlertDialogHeader>

                      <AlertDialogBody>{error}</AlertDialogBody>

                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={(e) => {
                            onClose();
                          }}
                        >
                          Try Again
                        </Button>
                        <Button
                          colorScheme='red'
                          onClick={(e) => {
                            onClose();
                            props.onHide();
                          }}
                          ml={3}
                        >
                          Try Later
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              )}
            </Modal.Footer>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddBookModal;
