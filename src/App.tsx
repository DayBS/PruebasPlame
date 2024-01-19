import { useState } from 'react'
import { HashRouter  as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css'
import logo from './logo.png';
import SeleccionMatriz from '@components/seleccionMatriz';
import VerMatrices from '@components/verMatrices';
import Tabla from '@components/tabla';
import InicioSesion from '@components/inicioSesion';

function App() {
  const [mostrarContenidoPrincipal, setMostrarContenidoPrincipal] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticación (puedes implementar tu propia lógica aquí)
    // Por ahora, solo establecemos el usuario como autenticado de forma ficticia
    setUsuarioAutenticado(true);
  };

  return (
    <Router>
      <div className="AppWithBackground">
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    {mostrarContenidoPrincipal && (
                      <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className='App-title'>
                          Matriz de Calidad del Plan de Mejora
                        </h1>
                        <div className='cuadrosTexto'>
                          Bienvenido. Esta aplicación permite revisar y llenar una matriz dedicada
                          a la calidad del plan de mejora de las distintas carreras de la
                          Universidad Mayor de San Simón.
                        </div>
                        <Link to="/verMatrices">
                          <button className="App-button">Invitado<br/> (Solo podra revisar las matrices)</button>
                        </Link>
                        <Link to="/inicioSesion">
                          <button className="App-button">Editor<br/>(Podra llenar matrices, se necesita cuenta)</button>
                        </Link>
                        <div className='cuadrosContacto'>
                          **Para solicitar una cuenta, por favor contactarse con la unidad responsable.
                        </div>
                      </div>
                    )}
                    {usuarioAutenticado && <Navigate to="/seleccionMatriz" />}
                  </div>
                }
              />
              <Route
                path="/inicioSesion"
                element={
                  <InicioSesion
                    onToggle={() => setMostrarContenidoPrincipal(false)}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/seleccionMatriz"
                element={
                  <SeleccionMatriz
                    onToggle={() => setMostrarContenidoPrincipal(false)}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/verMatrices"
                element={
                  <VerMatrices
                    onToggle={() => setMostrarContenidoPrincipal(false)}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/tabla"
                element={
                  <Tabla
                    onToggle={() => setMostrarContenidoPrincipal(false)}
                    onLogin={handleLogin}
                  />
                }
              />
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;

