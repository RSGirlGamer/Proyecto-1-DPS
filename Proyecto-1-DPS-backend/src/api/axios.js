import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', 
  timeout: 1000,
});

export const loginUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default instance;
