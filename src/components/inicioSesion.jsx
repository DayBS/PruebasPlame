import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import estilos from '../styles/login.css'
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import logo from '../logo.png';

const LoginForm = () => {
  const [username, setUsername] = useState('usuario');
  const [password, setPassword] = useState('contra');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'usuario' && password === 'contra') {
      // Redirigir a la página de dashboard si las credenciales son correctas
      navigate('/seleccionMatriz');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-form-container">
       <img src={logo} className="App-logo" alt="logo" />
      <h1 className='App-title'>Matriz de Calidad del Plan de Mejora </h1>
      <div className='cuadrosTexto'>
       Correo electronico:
      </div>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <div className='cuadrosTexto'>
       Contraseña:
      </div>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
     
      <button className='boton' onClick={handleLogin}>Iniciar sesión</button>

      <div>
    <Link to="/">
      <button className="Atras-button">Atras</button>
    </Link>

  </div>  
    </div>
  );
};

export default LoginForm;

