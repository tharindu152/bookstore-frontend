import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8081/users');
    console.log(response);
    return await response.data;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get('http://localhost:8081/users/' + id);
    return await response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post('http://localhost:8081/users', data);
    return await response.data;
  } catch (error) {
    return error;
  }
};
