import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { getBooksById } from '../../services/BookService';

const Book = () => {
  const [book, setBooks] = useState(null);

  const fetchBooks = async () => {
    const pathname = window.location.pathname;
    const id = pathname.substring(7);
    // console.log(id);
    const response = await getBooksById(id);
    // console.log(response);
    setBooks(response);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOrder = () => {};

  return (
    <div>
      <h1>Books Details</h1>
      <Row className='bookDetails'>
        <Col>
          {book && (
            <img
              className='itemImage'
              variant='top'
              src={`http://localhost:8081/uploads/${book.coverImage}`}
            />
          )}
        </Col>
        {book && (
          <Col key={book.id}>
            <div className='item'>
              <h3>{book.title}</h3>
              <h4>Written By: {book.author}</h4>
              <h4>Category: {book.subCategory.category.categoryName}</h4>
              <h4>Subcategory: {book.subCategory.subCategoryName}</h4>
              <p>{book.description}</p>
              <h4>Rs. {book.price}</h4>
              <h4>Qty available: {book.quantity}</h4>
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
        )}
      </Row>
      <Button variant='primary' size='sm' href='/cart'>
        View to Cart
      </Button>
    </div>
  );
};

export default Book;
