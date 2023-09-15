import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DropDown from './DropDown';
import { addBook, updateBookCoverImage } from '../services/BookService';

function AddBookModal(props) {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isbn10, setIsbn10] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  let id = 0;

  const handleFileChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      author: author,
      description: description,
      price: price,
      quantity: quantity,
      featured: false,
      subCategory: {
        id: 1,
        category: {
          id: 1,
        },
      },
      isbn10: isbn10,
    };

    const coverImageData = {
      coverImage: coverImage,
    };

    console.log(coverImage);

    console.log(data);

    const resBookCreate = await addBook(data);
    id = resBookCreate.id;

    const resCoverImgCreate = await updateBookCoverImage(id, coverImageData);
  };

  useEffect(() => {});

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add a Book for Sale
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='addBookForm'>
          <Form onSubmit={handleUpload}>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Title
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='Book Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Author
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='ABC John'
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Description
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='This book is about..?'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                ISBN
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='ISBN'
                  onChange={(e) => setIsbn10(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Price (LKR)
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  type='text'
                  placeholder='xxx'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Quantity
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  type='text'
                  placeholder='xxx'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formFile' className='mb-3'>
              <Form.Label column sm='2'>
                Cover Image
              </Form.Label>
              <Col>
                <Form.Control type='file' onChange={handleFileChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Category
              </Form.Label>
              <Col sm='10'>
                <DropDown
                  items={props.categories}
                  onChange={(e) => setCategory(e.target.value)}
                ></DropDown>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Sub Category
              </Form.Label>
              <Col sm='10'>
                <DropDown
                  items={props.subcategories}
                  onChange={(e) => setSubCategory(e.target.value)}
                ></DropDown>
              </Col>
            </Form.Group>
            <Modal.Footer>
              <Button
                onClick={props.onHide}
                className='btnCheckout'
                type='submit'
              >
                Submit Order
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddBookModal;
