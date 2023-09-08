import axios from 'axios';

export const getBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8081/books');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBooksById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/books/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
