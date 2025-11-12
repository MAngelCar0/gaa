import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from './ContextoUsuario';
import './Sugerencias.css';

const Sugerencias = () => {
  const navigate = useNavigate();
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);
  
  const handleLogout = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);
    
    navigate('/');
  };
  const [mensaje, setMensaje] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('sugerencias')) || [];
    setSugerencias(guardadas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      const nueva = {
        texto: mensaje,
        fecha: new Date().toLocaleString(),
        usuario: datos.username || 'Anónimo',
        avatar: avatar || '/default-avatar.png',
      };
      const actualizadas = [nueva, ...sugerencias];
      setSugerencias(actualizadas);
      localStorage.setItem('sugerencias', JSON.stringify(actualizadas));
      setMensaje('');
      setEnviado(true);
      setTimeout(() => setEnviado(false), 3000);
    }
  };

  const handleDelete = (index) => {
    const actualizadas = sugerencias.filter((_, i) => i !== index);
    setSugerencias(actualizadas);
    try {
      localStorage.setItem('sugerencias', JSON.stringify(actualizadas));
    } catch (err) {
      console.error('Error guardando sugerencias en localStorage', err);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/logo.1.png" alt="Logo" className="logo-img" />
          <div className="mini-perfil">
            <img 
  src={avatar || '/default-avatar.png'} 
  alt="Avatar" 
  className="mini-avatar" 
  onClick={() => navigate('/perfil')}
  style={{ cursor: 'pointer' }}
/>
            <div className="mini-info">
              <h4>{datos.nombre || 'Esteban Dominguez'}</h4>
              <p>@{datos.username || 'estebanXD'}</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button onClick={() => navigate('/')}>General</button>
            <button onClick={() => navigate('/valoraciones')}>Valoraciones</button>
            <button onClick={() => navigate('/ayuda')}>Centro de ayuda</button>
            <button onClick={() => navigate('/sugerencias')}>Sugerencias</button>
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="perfil">
        <div className="sugerencias">
          <h2>Sugerencias</h2>
          <p>¿Tienes ideas, mejoras o algo que quieras compartir? ¡Este es tu espacio!</p>

          <form onSubmit={handleSubmit}>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe tu sugerencia aquí..." rows={5} />
            <div className="form-actions">
              <button type="submit">Enviar</button>
            </div>
          </form>

          {enviado && <p className="confirmacion">¡Gracias por tu sugerencia!</p>}

          <div className="lista-sugerencias">
            {sugerencias.map((s, i) => (
              <div key={i} className="sugerencia-item">
                <img src={s.avatar} alt="Avatar" className="sugerencia-avatar" />
                <div className="sugerencia-contenido">
                  <p className="sugerencia-texto">{s.texto}</p>
                  <small className="sugerencia-meta">Enviado por <strong>@{s.usuario}</strong> el {s.fecha}</small>
                </div>
                <div className="sugerencia-actions">
                  <button className="sugerencia-borrar" onClick={() => handleDelete(i)}>Borrar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sugerencias;
