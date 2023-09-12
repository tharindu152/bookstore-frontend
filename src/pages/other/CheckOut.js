import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';

const CheckOut = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    console.log(cartItemsArr[0]);
    setCart(cartItemsArr);
  }, []);

  console.log(cart);

  return (
    <div>
      <h1>CheckOut</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan={2}>Product</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((book) => {
              return (
                <tr key={book.id}>
                  <td colSpan={2}>{book.title}</td>
                  <td>{book.unitPrice}</td>
                  <td>{book.quantity}</td>
                  <td>{book.unitPrice * book.quantity}</td>
                </tr>
              );
            })}

          <tr>
            <td colSpan={4}>VAT</td>
            <td>{(500.5 * 0.05).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4}>Final Total</td>
            <td>{525.53}</td>
          </tr>
        </tbody>
      </Table>
      <div className='shippingDetails'>
        <h4>Please enter your shipping Details</h4>
        <Form>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Full Name
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='ABC John' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Country
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='Country' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Street Address
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='Street' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Town/ City
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='Town/ City' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              State
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='State' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Zip Code
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='xxxxx' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Phone
            </Form.Label>
            <Col sm='10'>
              <Form.Control type='text' placeholder='xxx-xxxxxxx' />
            </Col>
          </Form.Group>
          <Button className='btnCheckout' type='submit' href='/'>
            🛒 COMPLETE ORDER & CHECKOUT
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckOut;
