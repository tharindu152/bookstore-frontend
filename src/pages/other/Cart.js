import React, { useEffect, useState } from 'react';
import { Button, Table, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  const finalCartStats = () => {
    const finalCartStats = {
      finalTotal: finalTotal,
      vat: (finalTotal * 0.06).toFixed(2),
    };
    localStorage.setItem('finalCartStats', JSON.stringify(finalCartStats));
  };

  const persistCart = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    const cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    setCart(
      cartItemsArr.map((book) => {
        return { ...book };
      })
    );
  };

  useEffect(() => {
    let cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    setCart(
      cartItemsArr &&
        cartItemsArr.map((book) => {
          return { ...book };
        })
    );
  }, []);

  useEffect(() => {
    console.log(cart);
    setFinalTotal(
      cart?.reduce((total, book) => (total += book.qty * book.unitPrice), 0)
    );
    finalCartStats();
  });

  return (
    <div>
      {cart != null ? (
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
                cart?.map((book, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Button
                          onClick={() => {
                            cart.splice(i, 1);
                            persistCart(cart);
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
                      <td>LKR {book.unitPrice}</td>
                      <td>{book.qty}</td>
                      <td>
                        <ButtonToolbar
                          className='btnToolBarIncDec'
                          aria-label='Toolbar with button groups'
                        >
                          <ButtonGroup className='btngpIncDec'>
                            <Button
                              variant='secondary'
                              onClick={(e) => {
                                e.preventDefault();
                                setCart(
                                  cart?.map((b) => {
                                    if (b == book && b.qty > 1) {
                                      b.qty--;
                                      b.subTotal = b.qty * b.unitPrice;
                                    }
                                    return b;
                                  })
                                );
                                persistCart(cart);
                              }}
                            >
                              -
                            </Button>{' '}
                            <Button
                              variant='dark'
                              onClick={(e) => {
                                e.preventDefault();
                                setCart(
                                  cart?.map((b) => {
                                    if (b == book && b.qty < b.quantity) {
                                      b.qty++;
                                      b.subTotal = b.qty * b.unitPrice;
                                    }
                                    return b;
                                  })
                                );
                                persistCart(cart);
                              }}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </td>
                      <td colSpan={2}>LKR {book.qty * book.unitPrice}</td>
                      {}
                    </tr>
                  );
                })}
              <tr>
                <td colSpan={8}>Total</td>
                <td>LKR {finalTotal}</td>
              </tr>
              <tr>
                <td colSpan={8}>VAT 6%</td>
                <td>LKR {(finalTotal * 0.06).toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
          <Button className='btnCheckout' href='/checkout'>
            PROCEED TO CHECKOUT
          </Button>
        </div>
      ) : (
        <div>
          <h3>Cart is empty..! Go ahead and add some books to cart</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
