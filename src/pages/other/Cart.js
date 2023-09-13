import React, { useEffect, useState } from 'react';
import { Button, Table, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    const cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    setCart(cartItemsArr);
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={2}>Product</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Unit Price</th>
            <th colSpan={2}>Qty</th>
            <th colSpan={2}>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((book, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Button
                      onClick={() => {
                        cart.splice(i, 1);
                        localStorage.setItem('cartItems', JSON.stringify(cart));
                        window.location.reload();
                      }}
                      variant='outline-danger'
                      size='sm'
                    >
                      ✕
                    </Button>
                  </td>
                  <td colSpan={2}>{book.title}</td>
                  <td>{book.category}</td>
                  <td>{book.subCategory}</td>
                  <td>{book.unitPrice}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <ButtonToolbar
                      className='btnToolBarIncDec'
                      aria-label='Toolbar with button groups'
                    >
                      <ButtonGroup className='btngpIncDec'>
                        <Button
                          variant='secondary'
                          onClick={() => {
                            setCart(
                              cart.map((b) => {
                                if (b == book) {
                                  b.quantity--;
                                }
                                return b;
                              })
                            );
                          }}
                        >
                          -
                        </Button>{' '}
                        <Button
                          variant='dark'
                          onClick={() => {
                            setCart(
                              cart.map((b) => {
                                if (b == book) {
                                  b.quantity++;
                                }
                                return b;
                              })
                            );
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </td>
                  <td colSpan={2}>{book.quantity * book.unitPrice}</td>
                </tr>
              );
            })}
          <tr>
            <td colSpan={8}>VAT 6%</td>
            <td>{(500.5 * 0.05).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={8}>Final Total</td>
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
