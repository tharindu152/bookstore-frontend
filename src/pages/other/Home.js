import { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { getBooks } from '../../services/BookService';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchBooks = async () => {
    const response = await getBooks();
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

  return (
    <div>
      <h1>Start buying</h1>
      <Row className='justify-content-md-center'>
        {books &&
          books.map((book) => {
            return (
              <Col key={book.id} xs={6} md={4}>
                <Card className='item'>
                  <Card.Img
                    className='itemImage'
                    variant='top'
                    value={book.id}
                    src={`http://localhost:8081/uploads/${book.coverImage}`}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Link to={`/books/${book.id}`}>More Details</Link>
                    <Card.Text>By: {book.author}</Card.Text>
                    <Card.Text>
                      Category: {book.subCategory.category.categoryName}
                    </Card.Text>
                    <Card.Text>
                      Subcategory: {book.subCategory.subCategoryName}
                    </Card.Text>
                    <Card.Text>ISBN: {book.isbn10}</Card.Text>
                    <Card.Text>Rs. {book.price}</Card.Text>
                    <Button
                      variant='primary'
                      onClick={(e) => {
                        handleShoppingCart(book);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
