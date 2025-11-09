import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';
import { reviews } from '../js/valoracionesData';

import './PerfilDeUsuario.css';

const opcionesSidebar = [
  "General",
  "Favoritos",
  "Valoraciones",
  "Centro de ayuda",
  "Sugerencias",
];

export default function Valoraciones() {
  const navigate = useNavigate();
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);
  
  const handleLogout = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);
    
    navigate('/');
  };

  const nombre = datos?.nombre || 'Esteban Dominguez';
  const username = datos?.username || 'estebanXD';
  const avatarSrc = avatar || datos?.avatar || '/avatar.jpeg';

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <div className="mini-perfil">
            <img src={avatarSrc} 
                alt="Avatar" 
                className="mini-avatar" 
                onClick={() => navigate('/perfil')}
                style={{ cursor: 'pointer' }}
              />
            <div className="mini-info">
              <h4>{nombre}</h4>
              <p>@{username}</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            {opcionesSidebar.map((opcion, i) => (
              <button
                key={i}
                onClick={() => {
                  if (opcion === "General") navigate("/");
                  else if (opcion === "Favoritos") navigate("/favoritos");
                  else if (opcion === "Valoraciones") navigate("/valoraciones");
                  else if (opcion === "Invitar a amigos") navigate("/invitar");
                  else if (opcion === "Centro de ayuda") navigate("/ayuda");
                  else if (opcion === "Sugerencias") navigate("/sugerencias");
                  else if (opcion === "Alertas de seguridad") navigate("/alertas");
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
        <section className="valoraciones">
          <h2>Valoraciones de Usuarios</h2>
          <ul className="valoraciones-lista">
            {reviews.map((review) => (
              <li key={review.id} className="valoracion-item">
                <img src={review.imagen} alt={`Avatar de ${review.nombre}`} className="valoracion-avatar-img" />
                <div className="valoracion-info">
                  <h4>{review.nombre}</h4>
                  <div className="valoracion-estrellas">{review.estrellas}</div>
                  <p>{review.comentario}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
