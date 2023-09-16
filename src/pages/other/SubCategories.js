import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getBooksBySubCategoryId } from '../../services/SubCategoryService';
import { useDisclosure } from '@chakra-ui/react';
import AlertModal from '../../utils/AlertModal';

const Categories = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const pathname = window.location.pathname;
  const id = pathname.substring(15, 16);

  const fetchBooks = async () => {
    const response = await getBooksBySubCategoryId(id);
    setBooks(response);
  };

  let data = {};

  const handleShoppingCart = (book) => {
    if (cart.findIndex((b) => b.id === book.id) !== -1) {
      setError(true);
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

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  });

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
                    onClick={(e) => {
                      navigate(`/books/${book.id}`);
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>By: {book.author}</Card.Text>
                    <Card.Text>
                      Category: {book.subCategory.category.categoryName}
                    </Card.Text>
                    <Card.Text>
                      Subcategory: {book.subCategory.subCategoryName}
                    </Card.Text>
                    {/* <Card.Text>{book.description}</Card.Text> */}
                    <Card.Text>Rs. {book.price}</Card.Text>
                    {book?.quantity > 0 ? (
                      <ReButton
                        variant='primary'
                        onClick={(e) => {
                          handleShoppingCart(book);
                          onOpen();
                        }}
                      >
                        Add to Cart
                      </ReButton>
                    ) : (
                      <ReButton variant='danger'>Out of Stock</ReButton>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        {error && (
          <AlertModal
            isOpen={isOpen}
            onClose={onClose}
            cancelRef={cancelRef}
          ></AlertModal>
        )}
      </Row>
    </div>
  );
};

export default Categories;
