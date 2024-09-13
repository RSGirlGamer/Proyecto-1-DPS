import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/registrar', userData);
    return response.data;
  } catch (error) {
    throw error;
  }

};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
