//importacion de axios
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/usuarios/registrar', // Cambia la URL según tu configuración
});

export default instance;
