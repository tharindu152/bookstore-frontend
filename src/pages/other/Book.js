import { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import { getBooksById } from '../../services/BookService';
import { useDisclosure } from '@chakra-ui/react';
import AlertModal from '../../utils/AlertModal';

const Book = () => {
  const [book, setBooks] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchBooks = async () => {
    const pathname = window.location.pathname;
    const id = pathname.substring(7);
    const response = await getBooksById(id);
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
    <div className='bookPage'>
      <h1>{book?.title}</h1>
      <Row>
        <Col className='bookImage '>
          {book && (
            <img
              className='itemImage'
              variant='top'
              src={`http://localhost:8081/uploads/${book.coverImage}`}
            />
          )}
        </Col>
        {book && (
          <Col key={book.id} className='bookDetails'>
            <div>
              <h5>
                Written By: <p>{book.author}</p>
              </h5>
              <h5>
                Category: <p>{book.subCategory.category.categoryName}</p>{' '}
              </h5>
              <h5>
                Subcategory: <p>{book.subCategory.subCategoryName}</p>{' '}
              </h5>
              <h5>
                ISBN: <p>{book.isbn10}</p>
              </h5>
              <h5>Description:</h5>
              <p>{book.description}</p>
              <h5>
                Rs. <p>{book.price}</p>
              </h5>
              <h5>
                Qty available: <p>{book.quantity}</p>
              </h5>
            </div>
          </Col>
        )}
      </Row>
      <Row>
        <div className='bookDetailBtnRow'>
          {book?.quantity > 0 ? (
            <ReButton
              className='btns'
              variant='outline-primary'
              onClick={(e) => {
                handleShoppingCart(book);
                onOpen();
              }}
            >
              Add to Cart
            </ReButton>
          ) : (
            <ReButton variant='danger' className='btns'>
              Out of Stock
            </ReButton>
          )}
          {error && (
            <AlertModal
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
            ></AlertModal>
          )}
          <ReButton className='btn' variant='outline-primary' href='/cart'>
            View Cart
          </ReButton>
        </div>
      </Row>
    </div>
  );
};

export default Book;
