// src/App.jsx
import Login from './components/Login';
import './App.css'; // Mantenemos la importación CSS si tienes estilos globales

function App() {
  // Ya no necesitamos el estado 'count' ni los logos de ejemplo

  return (
    <div className="App">
      {/* El componente Login se encarga de todo el formulario, estado y 
        la lógica de comunicación con el backend.
      */}
      <Login />
    </div>
  );
}

export default App;