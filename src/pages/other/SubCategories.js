import { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBooksBySubCategoryId } from '../../services/SubCategoryService';

const Categories = () => {
  const [books, setBooks] = useState(null);

  const pathname = window.location.pathname;
  const id = pathname.substring(15, 16);
  const fetchBooks = async () => {
    const response = await getBooksBySubCategoryId(id);
    setBooks(response);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOrder = () => {};

  return (
    <div>
      <h1>
        {books != null
          ? `${books[0].subCategory.category.categoryName} 👉 ${books[0].subCategory.subCategoryName}`
          : ''}
      </h1>
      <Row className='justify-content-center'>
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
                    href={`/books/${book.id}`}
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

export default Categories;
