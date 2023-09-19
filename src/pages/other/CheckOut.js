import React, { useEffect, useState, useRef } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import { createShippingDetails } from '../../services/ShippingDetailsService';
import { createOrder } from '../../services/OrderService';
import { getUserById } from '../../services/UserService';
import { updateBooks } from '../../services/BookService';
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

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [cartStat, setCartStat] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [country, setCountry] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const usrId = sessionStorage.getItem('user_id');

  const sendShippingDetails = async () => {
    // event.preventDefault();

    const data = {
      fullName: fullName,
      country: country,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      mobileNumber: phone,
    };

    const response = await createShippingDetails(data);
    console.log('Send shipping details ' + response.data);
    return response;
  };

  const sendOrderDetails = async () => {
    const data = {
      status: 'Completed',
      user: {
        id: usrId,
      },
    };

    const response = await createOrder(data);
    console.log('send order details ' + response);
    return response;
  };

  const updateBookQuantities = async () => {
    let response = null;
    cart?.map(async (book, i) => {
      response = await updateBooks(book.id, {
        quantity: book.quantity - book.qty,
      });
      console.log('update book ' + book.title + ' quantities ' + response);
    });
    return response;
  };

  useEffect(() => {
    const cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    const finalCartStats = JSON.parse(localStorage.getItem('finalCartStats'));
    setCart(cartItemsArr);
    setCartStat(finalCartStats);
  }, []);

  // console.log(cart);
  // console.log(cartStat);

  return (
    <div>
      {cart != null ? (
        <div>
          <h1>CheckOut</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={2}>Book</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart?.map((book) => {
                  return (
                    <tr key={book.id}>
                      <td colSpan={2}>{book.title}</td>
                      <td>LKR {book.unitPrice}</td>
                      <td>{book.qty}</td>
                      <td>LKR {book.subTotal}</td>
                    </tr>
                  );
                })}

              <tr>
                <td colSpan={4}>VAT 6%</td>
                <td>LKR {cartStat?.vat}</td>
              </tr>
              <tr>
                <td colSpan={4}>Final Total</td>
                <td>
                  LKR{' '}
                  {parseFloat(cartStat?.finalTotal) + parseFloat(cartStat?.vat)}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className='shippingDetails'>
            <h4>Please enter your shipping Details</h4>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                updateBookQuantities();
                sendShippingDetails();
                sendOrderDetails();
              }}
            >
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Full Name
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='ABC John'
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Country
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Street Address
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Street'
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Town/ City
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Town/ City'
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  State
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='State'
                    onChange={(e) => setState(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Zip Code
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='xxxxx'
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextEmail'
              >
                <Form.Label column sm='2'>
                  Mobile Number
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='xxx-xxxxxxx'
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <ReButton
                variant='outline-warning'
                type='submit'
                onClick={onOpen}
              >
                COMPLETE ORDER & CHECKOUT
              </ReButton>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Complete Order and CheckOut
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure that you want to complete the order and
                      checkout?{' '}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Review Order
                      </Button>
                      <Button
                        colorScheme='red'
                        onClick={(e) => {
                          onClose();
                          localStorage.removeItem('cartItems');
                          localStorage.removeItem('finalCartStats');
                          window.location.href = '/checkout';
                        }}
                        ml={3}
                      >
                        Complete and Checkout
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Form>
          </div>
        </div>
      ) : (
        <div className='cartEmptyDiv'>
          <h3>Cart is empty..! Go ahead and add some books to cart</h3>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
