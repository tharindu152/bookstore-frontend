import axios from 'axios';

export const getCategories = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBooksByCategoryId = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/categories/${id}/books`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
