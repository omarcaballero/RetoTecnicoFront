import React, { useState } from 'react';
import { login } from '../services/auth.service'; // Importar la función de login del servicio

const Login = () => {
  // Estados para el formulario, errores y la UI
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores
    setLoading(true); // Activar el estado de carga

    try {
      // 1. Llamar a la función de login del servicio
      const tokens = await login(username, password); 
      
      // 2. Manejo del éxito: Guardar tokens y notificar al usuario
      localStorage.setItem('accessToken', tokens.accessToken);
      // Opcional: localStorage.setItem('refreshToken', tokens.refreshToken);
      
      alert('¡Inicio de sesión exitoso! Token guardado.');
      
      // Aquí puedes añadir la lógica para redireccionar al usuario
      // Ejemplo: window.location.href = '/dashboard'; 

    } catch (err) {
      // 3. Manejo de errores: Mostrar el mensaje de error del servicio
      setError(err.message); 
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        
        {error && <p style={{ color: '#d9534f', marginTop: '10px', fontSize: '0.9em' }}>{error}</p>}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {loading ? 'Validando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;