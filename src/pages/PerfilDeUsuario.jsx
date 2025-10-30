import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';
import General from './General';

import './PerfilDeUsuario.css';

const opcionesSidebar = [
  'General',
  'Favoritos',
  'Valoraciones',
  'Centro de ayuda',
  'Sugerencias',
];

const PerfilDeUsuario = () => {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState('perfil');
  const { datos, avatar } = useContext(ContextoUsuario);

  const { setDatos, setAvatar } = useContext(ContextoUsuario);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    // Also don't remove registered users list (users)

    // Update context
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);

    // Redirect to home
    navigate('/');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/public/Logo.jpg" alt="Logo" className="logo-img" onClick={() => navigate('/')} />
          <div className="mini-perfil">
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="mini-avatar"
                onClick={() => {
                  // Navigate to profile summary (don't open the General settings panel)
                  setVistaActiva('perfil');
                  navigate('/perfil');
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setVistaActiva('perfil');
                    navigate('/perfil');
                  }
                }}
              />
            )}
            <div className="mini-info">
              <h4>{datos.nombre || datos.username || 'Usuario'}</h4>
              <p>@{datos.username || 'sin_usuario'}</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            {opcionesSidebar.map((opcion, i) => (
              <button
                key={i}
                onClick={() => {
                  if (opcion === 'General') setVistaActiva('general');
                  else if (opcion === 'Favoritos') navigate('/favoritos');
                  else if (opcion === 'Valoraciones') navigate('/valoraciones');
                  else if (opcion === 'Centro de ayuda') navigate('/ayuda');
                  else if (opcion === 'Sugerencias') navigate('/sugerencias');
                }}
              >
                {opcion}
              </button>
            ))}
          </nav>
        </div>

  <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="perfil">
        <h2>Perfil</h2>

        <div className="perfil-card">
          <div className="perfil-header">
            {avatar && <img src={avatar} alt="Avatar" className="avatar" />}
            <div className="perfil-info">
              <h3>{datos.nombre || datos.username || 'Usuario sin nombre'}</h3>
              <p><strong>Nombre de usuario:</strong> {datos.username || '—'}</p>
              <p><strong>Correo electrónico:</strong> {datos.correo || datos.email || '—'}</p>
              <p><strong>Idioma:</strong> {datos.idioma || 'Español'}</p>
            </div>
          </div>
        </div>

        {vistaActiva === 'general' && (
          <div className="perfil-card general-card">
            <General />
          </div>
        )}
      </main>
    </div>
  );
};

export default PerfilDeUsuario;
