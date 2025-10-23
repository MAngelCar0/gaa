import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';

import './PerfilDeUsuario.css';

const General = () => {
  const { datos, setDatos, avatar, setAvatar } = useContext(ContextoUsuario);
  const [inviteCode, setInviteCode] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const initialEmailRef = useRef(datos.email || '');

  useEffect(() => {
    // keep initialEmailRef in sync if datos loaded later
    if (datos && datos.email) initialEmailRef.current = datos.email;
  }, [datos]);

  const persistToUsers = (updatedDatos) => {
    try {
      const usuariosJSON = localStorage.getItem('users');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      const idx = usuarios.findIndex((u) => u.email === initialEmailRef.current);
      if (idx >= 0) {
        usuarios[idx] = {
          ...usuarios[idx],
          name: updatedDatos.nombre || usuarios[idx].name,
          email: updatedDadosOrFallback(updatedDatos.email, usuarios[idx].email),
          username: updatedDatos.username || usuarios[idx].username,
          password: updatedDatos.password || usuarios[idx].password,
          avatar: updatedDatos.avatar || usuarios[idx].avatar,
        };
        localStorage.setItem('users', JSON.stringify(usuarios));
        initialEmailRef.current = usuarios[idx].email;
      } else if (updatedDatos.email) {
        // create a new user record if none exists
        const nuevo = {
          name: updatedDatos.nombre || '',
          email: updatedDatos.email,
          password: updatedDatos.password || '',
          avatar: updatedDatos.avatar || '',
        };
        usuarios.push(nuevo);
        localStorage.setItem('users', JSON.stringify(usuarios));
        initialEmailRef.current = nuevo.email;
      }
    } catch (err) {
      console.error('Error persistiendo cambios en users:', err);
    }
  };

  // helper to avoid reference error in object literal above
  const updatedDadosOrFallback = (val, fallback) => (typeof val !== 'undefined' && val !== null ? val : fallback);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => {
      const updated = { ...prev, [name]: value };
      try {
        localStorage.setItem('datosUsuario', JSON.stringify(updated));
      } catch (err) {
        console.error('Error guardando datosUsuario en localStorage', err);
      }
      // persist immediately so single-field edits survive logout
      try {
        persistToUsers(updated);
      } catch (err) {
        console.error('Error persistiendo cambio inmediato en users', err);
      }
      return updated;
    });
  };

  const handleSaveChanges = () => {
    // Ensure datosUsuario in localStorage is up to date and use that canonical copy
    try {
      localStorage.setItem('datosUsuario', JSON.stringify(datos));
    } catch (err) {
      console.error('Error guardando datosUsuario en localStorage', err);
    }
    const datosGuardados = (() => {
      try {
        return JSON.parse(localStorage.getItem('datosUsuario')) || datos;
      } catch (err) {
        return datos;
      }
    })();
    // persist changes into the registered users list so they survive logout
    persistToUsers(datosGuardados);
    alert('Tus cambios han sido guardados correctamente.');
  };

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      const usuariosJSON = localStorage.getItem('users');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      const filtered = usuarios.filter((u) => u.email !== initialEmailRef.current);
      localStorage.setItem('users', JSON.stringify(filtered));
    } catch (err) {
      console.error('Error eliminando usuario de users:', err);
    }

    // Clean session data
    try { localStorage.removeItem('datosUsuario'); } catch (err) { /* ignore */ }
    try { localStorage.removeItem('avatarUsuario'); } catch (err) { /* ignore */ }

    // Clear context
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);

    // Redirect to home using React Router
    navigate('/');
  };

  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setInviteCode(code);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        try {
          localStorage.setItem('avatarUsuario', reader.result);
        } catch (err) {
          console.error('Error guardando avatarUsuario en localStorage', err);
        }
        setDatos((prev) => {
          const updated = { ...prev, avatar: reader.result };
          try { localStorage.setItem('datosUsuario', JSON.stringify(updated)); } catch (err) { /* ignore */ }
          // also persist to users list
          persistToUsers(updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="general-settings">
      <h2>Configuración General</h2>
      <div className="setting-group">
        <label>Nombre completo</label>
        <input type="text" name="nombre" value={datos.nombre || ''} onChange={handleChange} placeholder="Editar nombre completo" />
      </div>
      <div className="setting-group">
        <label>Nombre de usuario</label>
        <input type="text" name="username" value={datos.username || ''} onChange={handleChange} placeholder="Editar nombre de usuario" />
      </div>
      <div className="setting-group">
        <label>Cambiar Contraseña</label>
        <input type="password" name="password" value={datos.password || ''} onChange={handleChange} placeholder="Nueva contraseña" />
      </div>
      <div className="setting-group avatar-group">
        <label>Avatar</label>
        {avatar && <img src={avatar} alt="Avatar" className="mini-avatar" />}
        <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        <button className="guardar" onClick={() => document.getElementById('avatar-upload').click()}>Cambiar avatar</button>
        {avatarName && (<p className="invite-code">Archivo seleccionado: <strong>{avatarName}</strong></p>)}
      </div>
      <div className="setting-group">
        <label>Correo electrónico</label>
        <input type="email" name="email" value={datos.email || ''} onChange={handleChange} placeholder="Confirmar correo" />
      </div>
      <div className="setting-group">
        <label>Correo de recuperación</label>
        <input type="email" name="recoveryEmail" value={datos.recoveryEmail || ''} onChange={handleChange} placeholder="Correo alternativo" />
      </div>
      <div className="setting-group">
        <label>Número de celular</label>
        <input type="tel" name="phone" value={datos.phone || ''} onChange={handleChange} placeholder="Número de teléfono" />
      </div>
      <div className="setting-group">
        <label>Invitar a un amigo</label>
        <button className="guardar" onClick={generateInviteCode}>Generar código</button>
        {inviteCode && (<p className="invite-code">Tu código: <strong>{inviteCode}</strong></p>)}
      </div>
      <div className="setting-group">
        <button className="guardar" onClick={handleSaveChanges}>Guardar</button>
      </div>
      <div className="setting-group">
        <button className="guardar" style={{ backgroundColor: '#c62828' }} onClick={handleDeleteAccount}>Eliminar cuenta</button>
      </div>
    </div>
  );
};

export default General;
