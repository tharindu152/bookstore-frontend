import axios from 'axios';
import { useState, useRef } from 'react';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import ReButton from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleUsername = (event) => {
    setUsername(event.target.value);
    if (username.length <= 5) {
      setLoginEnabled(false);
    } else {
      setLoginEnabled(true);
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (password.length < 6) {
      setLoginEnabled(false);
    } else {
      setLoginEnabled(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/auth/login',
        data
      );
      setUsername('');
      setPassword('');

      //sessionStrorage is in the client's browser
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('user_id', response.data.id);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      console.log(response.data.token);

      navigate('/');
    } catch (error) {
      setUsername('');
      setPassword('');
      setError(error);
    }
  };

  return (
    <>
      <Container>
        <div className='login-box shadow-sm rounded'>
          <div className='text-center mb-4'>
            <h1>User Login</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId='username'
              label='Select a Username'
              className='mb-3'
            >
              <Form.Control
                placeholder='Select a Username'
                value={username}
                onChange={handleUsername}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId='password'
              label='Select a Password'
              className='mb-3'
            >
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={handlePassword}
              />
            </FloatingLabel>

            <ReButton
              variant='primary'
              type='submit'
              disabled={!loginEnabled}
              onClick={onOpen}
            >
              Login
            </ReButton>

            {error && (
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Login Error
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Username or Password is wrong! <br /> If you do not have
                      an account please register first.{' '}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Try Again
                      </Button>
                      <Button
                        colorScheme='red'
                        onClick={(e) => {
                          onClose();
                          window.location.href = '/register';
                        }}
                        ml={3}
                      >
                        Register
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            )}
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
