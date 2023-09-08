import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DropDown from './DropDown';

function MyVerticallyCenteredModal(props) {
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
          <Form>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='addBookForm.ControlInput1'
            >
              <Form.Label column sm='2'>
                Title
              </Form.Label>
              <Col sm='10'>
                <Form.Control type='text' placeholder='Book Title' />
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
                <Form.Control type='text' placeholder='ABC John' />
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
                <Form.Control type='text' placeholder='This book is about..?' />
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
                <Form.Control type='text' placeholder='xxx' />
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
                <Form.Control type='text' placeholder='xxx' />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formFile' className='mb-3'>
              <Form.Label column sm='2'>
                Cover Image
              </Form.Label>
              <Col>
                <Form.Control type='file' />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Category
              </Form.Label>
              <Col sm='10'>
                <DropDown items={props.categories}></DropDown>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='dropDownSelection'>
              <Form.Label column sm='2'>
                Sub Category
              </Form.Label>
              <Col sm='10'>
                <DropDown items={props.subcategories}></DropDown>
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

export default MyVerticallyCenteredModal;
