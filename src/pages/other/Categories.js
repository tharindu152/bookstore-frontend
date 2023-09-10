import { useEffect, useState } from 'react';
import { Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import { getBooksByCategoryId } from '../../services/CategoryService';

const Categories = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const id = 1;
      const response = await getBooksByCategoryId(id);
      // console.log(response);
      setBooks(response);
    };

    fetchBooks();
  }, []);

  const handleOrder = () => {};

  return (
    <div>
      <h1>Categories</h1>
      <Row>
        {books &&
          books.map((book) => {
            return (
              <Col key={book.id}>
                <div className='item'>
                  <h3>{book.title}</h3>
                  <h4>Rs. {book.price}</h4>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={() => {
                      handleOrder(book);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Categories;
