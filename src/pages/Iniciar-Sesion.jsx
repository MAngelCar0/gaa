import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';

import Header from '../components/Header';

function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setDatos, setAvatar } = useContext(ContextoUsuario);

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

    navigate('/perfil');
  };

  return (
    <>
      <Header />
      <main className="pagina">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'salmon' }}>{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}

export default IniciarSesion;
