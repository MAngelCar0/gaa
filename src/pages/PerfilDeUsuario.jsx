import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PantallaCarga from '../components/PantallaCarga';
import { ContextoUsuario } from './ContextoUsuario';
import General from './General';
import './PerfilDeUsuario.css';

const PerfilDeUsuario = () => {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState('perfil');
  const [cargando, setCargando] = useState(false);
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);

  const limpiarSesion = () => {
    try {
      localStorage.removeItem('datosUsuario');
      localStorage.removeItem('avatarUsuario');
      setDatos({});
      setAvatar(null);
    } catch (err) {
      console.error('Error al limpiar la sesión:', err);
    }
  };

  const handleLogout = () => {
    setCargando(true);
    limpiarSesion();

    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  if (cargando) {
    return <PantallaCarga mensaje="Cerrando sesión..." />;
  }

  const rutas = {
    General: () => setVistaActiva('general'),
    Valoraciones: () => navigate('/valoraciones'),
    'Centro de ayuda': () => navigate('/ayuda'),
    Sugerencias: () => navigate('/sugerencias'),
  };

  const AvatarSeguro = ({ src, alt, clase }) => (
    src ? (
      <img src={src} alt={alt} className={clase} />
    ) : (
      <div className={`avatar-placeholder ${clase}`}>
        <span>👤</span>
      </div>
    )
  );

  return (
    <div className="dashboard">
      
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="logo-container">
          <img
            src="/logo.1.png"
            alt="Logo"
            className="logo-img"
            onClick={() => navigate('/')}
          />

          {/* --- Mini Perfil --- */}
          <div className="mini-perfil" onClick={() => setVistaActiva('perfil')}>
            <AvatarSeguro src={avatar} alt="Avatar" clase="mini-avatar" />

            <div className="mini-info">
              <h4>{datos.nombre || datos.username || 'Usuario'}</h4>
              <p>@{datos.username || 'sin_usuario'}</p>
            </div>
          </div>

          {/* --- Menú lateral --- */}
          <nav className="sidebar-menu">
            {Object.keys(rutas).map((opcion) => (
              <button key={opcion} onClick={rutas[opcion]}>
                {opcion}
              </button>
            ))}
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* --- Contenido principal --- */}
      <main className="perfil">
        <h2>Perfil</h2>

        <div className="perfil-card">
          <div className="perfil-header">
            <AvatarSeguro src={avatar} alt="Avatar" clase="avatar" />
            <div className="perfil-info">
              <h3>{datos.nombre || datos.username || 'Usuario sin nombre'}</h3>
              <p><strong>Nombre de usuario:</strong> {datos.username || '—'}</p>
              <p><strong>Correo electrónico:</strong> {datos.email || '—'}</p>
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
