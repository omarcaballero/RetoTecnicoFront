import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error de conexión o credenciales inválidas.';
    const remainingTime = error.response?.data?.remainingTime;
    const err = new Error(message);
    if (remainingTime !== undefined) {
      err.remainingTime = remainingTime;
    }
    throw err;
  }
};
