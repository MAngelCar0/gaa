import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { ContextoUsuario } from './ContextoUsuario';

import './PerfilDeUsuario.css';

const fallbackUsuario = {
  nombre: 'Esteban Dominguez',
  username: 'estebanXD',
  avatar: '/avatar.jpeg',
  favoritos: [
    { nombre: 'Auriculares Bluetooth RGB', descripcion: 'Auriculares con aislamiento con cancelación de ruido y luz RGB para gaming.', precioAntes: '$1,500', precioAhora: '$1,200', ahorro: '$300', imagen: '/auriculares.png' },
    { nombre: 'Disco duro externo 16TB', descripcion: 'SSD 3.0 de 16TB para contenido y archivos.', precioAntes: '$2,000', precioAhora: '$1,500', ahorro: '$500', imagen: '/disco-duro.png' },
    { nombre: 'Auriculares HiFi KZ ZS10 Pro', descripcion: 'Auriculares in-ear con cable y cancelación de ruido para música y deportes.', precioAntes: '$1,800', precioAhora: '$1,500', ahorro: '$300', imagen: '/hifi-kz.png' }
  ]
};

export default function Favoritos() {
  const navigate = useNavigate();
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);
  
  const handleLogout = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);
    
    navigate('/');
  };

  const nombre = datos?.nombre || fallbackUsuario.nombre;
  const username = datos?.username || fallbackUsuario.username;
  const avatarSrc = avatar || datos?.avatar || fallbackUsuario.avatar;
  const favoritos = datos?.favoritos || fallbackUsuario.favoritos;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/logo.1.png" alt="Logo" className="logo-img" />
          <div className="mini-perfil">
            <img 
  src={avatarSrc} 
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
            <button onClick={() => navigate('/')}>General</button>
            <button onClick={() => navigate('/favoritos')}>Favoritos</button>
            <button onClick={() => navigate('/valoraciones')}>Valoraciones</button>
            <button onClick={() => navigate('/invitar')}>Invitar a amigos</button>
            <button onClick={() => navigate('/ayuda')}>Centro de ayuda</button>
            <button onClick={() => navigate('/sugerencias')}>Sugerencias</button>
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="perfil">
        <h2>Mis favoritos</h2>
        <ul className="favoritos-lista">
          {favoritos.map((item, i) => (
            <li key={i} className="favorito-item">
              <img src={item.imagen} alt={item.nombre} className="favorito-img" />
              <div className="favorito-info">
                <h3 className="favorito-nombre">{item.nombre}</h3>
                <p className="favorito-descripcion">{item.descripcion}</p>
                <p className="favorito-precio"><strong>Antes:</strong> {item.precioAntes} <br /> <strong>Ahora:</strong> {item.precioAhora} <br /> <span className="favorito-ahorro">¡Ahorra {item.ahorro}!</span></p>
                <div className="favorito-acciones">
                  <button className="ver-producto">Ver Producto</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
