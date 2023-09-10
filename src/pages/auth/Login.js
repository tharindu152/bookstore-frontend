import axios from 'axios';
import { useState } from 'react';
import { Button, Container, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
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
      setError('');
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
      setError('Username or Password is wrong');
      setUsername('');
      setPassword('');
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

            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </div>
      </Container>
      {error && (
        <Alert key='danger' variant='danger'>
          {error}
          <p>
            If you do not have a user accout please register before loging in
          </p>
          <Button variant='primary' href='/register'>
            Register
          </Button>
        </Alert>
      )}
    </>
  );
};

export default Login;
