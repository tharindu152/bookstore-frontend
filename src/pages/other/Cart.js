import React from 'react';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
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
            <th>Qty</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button variant='outline-danger' size='sm'>
                X
              </Button>
            </td>
            <td colSpan={2}>Assasins</td>
            <td>Science Fiction</td>
            <td>Classic</td>
            <td>250.25</td>
            <td>2</td>
            <td>{250.25 * 2}</td>
          </tr>
          <tr>
            <td colSpan={7}>VAT</td>
            <td>{(500.5 * 0.05).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={7}>Final Total</td>
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
