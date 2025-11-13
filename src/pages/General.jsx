import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from './ContextoUsuario';
import './PerfilDeUsuario.css';

const General = () => {
  const { datos, setDatos, avatar, setAvatar } = useContext(ContextoUsuario);
  const [inviteCode, setInviteCode] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const initialEmailRef = useRef(datos.email || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (datos?.email) initialEmailRef.current = datos.email;
  }, [datos]);

  // ✅ Helper para evitar referencia indefinida
  const updatedDatosOrFallback = (val, fallback) =>
    typeof val !== 'undefined' && val !== null ? val : fallback;

  // ✅ Guardar cambios en la lista de usuarios persistentes
  const persistToUsers = (updatedDatos) => {
    try {
      const usuariosJSON = localStorage.getItem('users');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      const idx = usuarios.findIndex((u) => u.email === initialEmailRef.current);

      if (idx >= 0) {
        usuarios[idx] = {
          ...usuarios[idx],
          name: updatedDatos.nombre || usuarios[idx].name,
          email: updatedDatosOrFallback(updatedDatos.email, usuarios[idx].email),
          password: updatedDatos.password || usuarios[idx].password,
          avatar: updatedDatos.avatar || usuarios[idx].avatar,
        };
        localStorage.setItem('users', JSON.stringify(usuarios));
        initialEmailRef.current = usuarios[idx].email;
      } else if (updatedDatos.email) {
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

  // ✅ Cambios de texto / inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => {
      const updated = { ...prev, [name]: value };
      try {
        localStorage.setItem('datosUsuario', JSON.stringify(updated));
        persistToUsers(updated);
      } catch (err) {
        console.error('Error guardando datosUsuario en localStorage', err);
      }
      return updated;
    });
  };

  // ✅ Guardar cambios manualmente
  const handleSaveChanges = () => {
    try {
      localStorage.setItem('datosUsuario', JSON.stringify(datos));
      persistToUsers(datos);
      alert('✅ Tus cambios han sido guardados correctamente.');
    } catch (err) {
      console.error('Error guardando datosUsuario en localStorage', err);
    }
  };

  // ✅ Eliminar cuenta
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
    );
    if (!confirmDelete) return;

    try {
      const usuariosJSON = localStorage.getItem('users');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      const filtered = usuarios.filter((u) => u.email !== initialEmailRef.current);
      localStorage.setItem('users', JSON.stringify(filtered));
    } catch (err) {
      console.error('Error eliminando usuario de users:', err);
    }

    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    setDatos({});
    setAvatar(null);
    navigate('/');
  };

  // ✅ Cambiar avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgData = reader.result;
      setAvatar(imgData);
      const updated = { ...datos, avatar: imgData };

      try {
        localStorage.setItem('avatarUsuario', imgData);
        localStorage.setItem('datosUsuario', JSON.stringify(updated));
        persistToUsers(updated);
      } catch (err) {
        console.error('Error guardando avatarUsuario en localStorage', err);
      }

      setDatos(updated);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Generar código de invitación
  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setInviteCode(code);
  };

  return (
    <div className="general-settings">
      <h2>Configuración General</h2>

      <div className="setting-group">
        <label>Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={datos.nombre || ''}
          onChange={handleChange}
          placeholder="Editar nombre completo"
        />
      </div>

      <div className="setting-group">
        <label>Cambiar Contraseña</label>
        <input
          type="password"
          name="password"
          value={datos.password || ''}
          onChange={handleChange}
          placeholder="Nueva contraseña"
        />
      </div>

      <div className="setting-group avatar-group">
        <label>Avatar</label>
        {avatar && <img src={avatar} alt="Avatar" className="mini-avatar" />}
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
        <button className="guardar" onClick={() => document.getElementById('avatar-upload').click()}>
          Cambiar avatar
        </button>
        {avatarName && (
          <p className="invite-code">
            Archivo seleccionado: <strong>{avatarName}</strong>
          </p>
        )}
      </div>

      <div className="setting-group">
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={datos.email || ''}
          onChange={handleChange}
          placeholder="Confirmar correo"
        />
      </div>

      <div className="setting-group">
        <label>Correo de recuperación</label>
        <input
          type="email"
          name="recoveryEmail"
          value={datos.recoveryEmail || ''}
          onChange={handleChange}
          placeholder="Correo alternativo"
        />
      </div>

      <div className="setting-group">
        <label>Número de celular</label>
        <input
          type="tel"
          name="phone"
          value={datos.phone || ''}
          onChange={handleChange}
          placeholder="Número de teléfono"
        />
      </div>

      <div className="setting-group">
        <label>Invitar a un amigo</label>
        <button className="guardar" onClick={generateInviteCode}>
          Generar código
        </button>
        {inviteCode && (
          <p className="invite-code">
            Tu código: <strong>{inviteCode}</strong>
          </p>
        )}
      </div>

      <div className="setting-actions">
        <button className="guardar" onClick={handleSaveChanges}>
          Guardar cambios
        </button>
        <button className="guardar" style={{ backgroundColor: '#c62828' }} onClick={handleDeleteAccount}>
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default General;
