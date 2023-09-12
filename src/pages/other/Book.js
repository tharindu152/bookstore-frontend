import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { getBooksById } from '../../services/BookService';

const Book = () => {
  const [book, setBooks] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchBooks = async () => {
    const pathname = window.location.pathname;
    const id = pathname.substring(7);
    const response = await getBooksById(id);
    setBooks(response);
  };

  const handleShoppingCart = (book) => {
    const data = {
      id: book.id,
      title: book.title,
      category: book.subCategory.category.categoryName,
      subCategory: book.subCategory.subCategoryName,
      unitPrice: book.price,
      quantity: book.quantity,
    };

    setCart((prevArr) => {
      const cartItems = [...prevArr, data];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return cartItems;
    });
  };

  useEffect(() => {
    fetchBooks();
    const cartItemsArr = JSON.parse(localStorage.getItem('cartItems'));
    setCart(cartItemsArr);
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
                onClick={(e) => {
                  handleShoppingCart(book);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Button variant='primary' size='sm' href='/cart'>
        View Cart
      </Button>
    </div>
  );
};

export default Book;
