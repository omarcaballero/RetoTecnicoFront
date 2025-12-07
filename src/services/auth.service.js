// src/services/auth.service.js

import axios from 'axios';

// Configura la instancia de Axios. 
// Axios usará automáticamente el proxy configurado en vite.config.js
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Función para iniciar sesión. Es la única responsable de la comunicación con la API.
 * @param {string} username
 * @param {string} password
 * @returns {object} { accessToken, refreshToken }
 */
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    
    // Si la respuesta es exitosa (código 2xx), Axios devuelve el body en response.data
    return response.data; 
  } catch (error) {
    // Si la respuesta es un error (código 4xx o 5xx), Axios lo captura aquí.
    // Usamos el mensaje de error del backend si existe, o un mensaje genérico.
    const message = error.response?.data?.message || 'Error de conexión o credenciales inválidas.';
    throw new Error(message);
  }
};