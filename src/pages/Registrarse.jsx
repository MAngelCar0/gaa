import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';

import './Registrarse.css';

function Registrarse() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setDatos, setAvatar } = useContext(ContextoUsuario);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!agree) return setError('Debes aceptar los términos');
    if (password !== confirm) return setError('Las contraseñas no coinciden');

    const usuariosJSON = localStorage.getItem('users');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    if (usuarios.some(u => u.email === email)) return setError('Ya existe una cuenta con ese correo');

    const nuevo = { name, email, password, avatar: '/Logo.jpg' };
    usuarios.push(nuevo);
    localStorage.setItem('users', JSON.stringify(usuarios));

    const datosUsuario = { nombre: name, email };
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    localStorage.setItem('avatarUsuario', nuevo.avatar);

    if (setDatos) setDatos(datosUsuario);
    if (setAvatar) setAvatar(nuevo.avatar);

    navigate('/perfil');
  };

  return (
    <>
      <main className="form-container">
        <h2 className="form-title">Registrarse</h2>
        <form onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Nombre de Usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <section className="form-redes">
            <h3 className="form-redes-title">Registrarse con redes sociales</h3>
            <div className="form-redes-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </section>
          <p className="form-agreement">
            Al registrarte, aceptas nuestras <a href="/terminos">condiciones de uso</a> y <a href="/privacidad">política de privacidad</a>.
          </p>
          <label className="form-checkbox">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            Aceptar términos y condiciones
          </label>
          {error && <p style={{ color: 'salmon' }}>{error}</p>}
          <button className="form-button" type="submit">Crear cuenta</button>
        </form>
      </main>
    </>
  );
}

export default Registrarse;
