import axios from 'axios';

export const getSubCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/subcategories`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubCategoriesByCategoryId = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/subcategories/categories/${id}/subcategories`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBooksBySubCategoryId = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/subcategories/${id}/books`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
