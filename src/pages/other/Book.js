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

  let data = {};

  const handleShoppingCart = (book) => {
    if (cart.findIndex((b) => b.id === book.id) !== -1) {
      alert('Book is already added to the cart');
      return;
    }

    data = {
      id: book.id,
      title: book.title,
      category: book.subCategory.category.categoryName,
      subCategory: book.subCategory.subCategoryName,
      unitPrice: book.price,
      quantity: book.quantity,
      qty: 1,
      subTotal: book.price,
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
    setCart(cartItemsArr ? cartItemsArr : []);
  }, []);

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
          <Col key={book.id} className='details'>
            <div>
              <h3>{book.title}</h3>
              <h4>Written By: {book.author}</h4>
              <h4>Category: {book.subCategory.category.categoryName}</h4>
              <h4>Subcategory: {book.subCategory.subCategoryName}</h4>
              <h4>ISBN: {book.isbn10}</h4>
              <p>{book.description}</p>
              <h4>Rs. {book.price}</h4>
              <h4>Qty available: {book.quantity}</h4>
              {book?.quantity > 0 ? (
                <Button
                  variant='primary'
                  onClick={(e) => {
                    handleShoppingCart(book);
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button variant='danger'>Out of Stock</Button>
              )}
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
