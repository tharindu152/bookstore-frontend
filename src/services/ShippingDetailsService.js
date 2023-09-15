import axios from 'axios';

export const createShippingDetails = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:8081/shippingDetails',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
