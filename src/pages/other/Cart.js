import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  // const calculateVAT = (finalTotal) => {
  //   return (finalTotal * 0.06).toFixed(2);
  // };

  // const calculateFinalTotal = (book) => {
  //   setFinalTotal((prevValue) => (prevValue += book.unitPrice * book.quantity));
  // };

  useEffect(() => {
    const cartItemsArr = [localStorage.getItem('cartItems')];
    const items = JSON.parse(cartItemsArr);
    setCart(items);
    console.log(items);
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th></th> */}
            <th colSpan={2}>Product</th>
            <th>Category</th>
            <th>Sub Category</th>
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
                  {/* <td>
                    <Button variant='outline-danger' size='sm'>
                      X
                    </Button>
                  </td> */}
                  <td colSpan={2}>{book.title}</td>
                  <td>{book.category}</td>
                  <td>{book.subCategory}</td>
                  <td>{book.unitPrice}</td>
                  <td>{book.quantity}</td>
                  <td>{book.unitPrice * book.quantity}</td>
                  {/* {calculateFinalTotal(book)} */}
                </tr>
              );
            })}
          <tr>
            <td colSpan={6}>VAT 6%</td>
            <td>{(500.5 * 0.05).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={6}>Final Total</td>
            <td>{525.53}</td>
          </tr>
        </tbody>
      </Table>
      <Button className='btnCheckout' href='/checkout'>
        PROCEED TO CHECKOUT
      </Button>
    </div>
  );
};

export default Cart;
