import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from './ContextoUsuario';
import './IniciarSesion.css';

import Header from '../components/Header';

/* Capturar datos del formulario */
function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setDatos, setAvatar } = useContext(ContextoUsuario);

  /* Funcionamiento de que si no aceptan terminos y condiciones no avanza, y si las contraseñas son incorrectas
  inicio de sesion en pocas palabras  */
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const usuariosJSON = localStorage.getItem('users');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    const datosUsuario = { nombre: usuario.name, email: usuario.email };
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    if (usuario.avatar) localStorage.setItem('avatarUsuario', usuario.avatar);
    else localStorage.removeItem('avatarUsuario');

    // Update context immediately
    if (setDatos) setDatos(datosUsuario);
    if (setAvatar) setAvatar(usuario.avatar || null);
    /* Ruta para ir a la vista el perfil */
    navigate('/perfil');
  };

  return (
    <>
      <Header />
      <main className="Form-loging">
        <h2 className="Form-loging-title">Iniciar Sesión</h2>
        <form className="Form-loging-form" onSubmit={onSubmit}>
          <input className="Form-loging-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className="Form-loging-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="Form-loging-redes">Inicia sesion con</span>  
            <i className="Form-loging-redes"></i>
            <img src="" alt="Facebook" />
            <img src="" alt="Twitter" />
            <img src= "" alt="Instagram" />
              <p className="Form-loging-recuperar">¿Olvidaste tu contraseña? <a href="/recuperar-contrasena">Recuperala aquí</a></p>
              <p className="Form-loging-registrar">¿No tienes cuenta? <a href="/registrarse">Regístrate aquí</a></p>
          <button className="Form-loging-button" type="submit">Entrar</button>
          {error && <p style={{ color: 'salmon' }}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default IniciarSesion;
