import { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { getBooks } from '../../services/BookService';
import { Link } from 'react-router-dom';
// import bodyParser from 'body-parser';

const Home = () => {
  const [books, setBooks] = useState(null);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOrder = () => {};

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
                    {/* <Card.Text>{book.description}</Card.Text> */}
                    <Card.Text>Rs. {book.price}</Card.Text>
                    <Button
                      href='/cart'
                      variant='primary'
                      onClick={(e) => {
                        console.log(e.target.value);
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
