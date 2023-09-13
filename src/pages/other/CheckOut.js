import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [country, setCountry] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleUserDetails = (event) => {
    event.preventDefault();
    const data = {
      fullName: fullName,
      country: country,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      phone: phone,
    };

    console.log(data);
  };

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
        <Form onSubmit={handleUserDetails}>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
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
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Phone
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                type='text'
                placeholder='xxx-xxxxxxx'
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button className='btnCheckout' type='submit'>
            🛒 COMPLETE ORDER & CHECKOUT
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckOut;
