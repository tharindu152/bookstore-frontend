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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBook = async (data) => {
  try {
    const response = await axios.post('http://localhost:8081/books', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBooks = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:8081/books/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBookCoverImage = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:8081/bookCoverImage/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
