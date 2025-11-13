import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextoUsuario } from './ContextoUsuario';

import './PerfilDeUsuario.css';

const opcionesSidebar = [
  "General",
  "Valoraciones",
  "Centro de ayuda",
  "Sugerencias",
];

export default function Valoraciones() {
  const navigate = useNavigate();
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState(5);
  const [lista, setLista] = useState([]);
  
  const handleLogout = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);
    
    navigate('/');
  };

  const nombre = datos?.nombre || 'Esteban Dominguez';
  const avatarSrc = avatar || datos?.avatar || '/avatar.jpeg';

  useEffect(() => {
    try {
      const guardadas = JSON.parse(localStorage.getItem('valoraciones') || '[]');
      setLista(guardadas);
    } catch {
      setLista([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = comentario.trim();
    if (!texto) return;
    const nueva = {
      id: Date.now(),
      nombre,
      imagen: avatarSrc,
      estrellas: '★'.repeat(rating),
      comentario: texto,
      fecha: new Date().toLocaleString(),
    };
    const actualizadas = [nueva, ...lista];
    setLista(actualizadas);
    localStorage.setItem('valoraciones', JSON.stringify(actualizadas));
    setComentario('');
    setRating(5);
  };

  const handleDelete = (id) => {
    const actualizadas = lista.filter((r) => r.id !== id);
    setLista(actualizadas);
    localStorage.setItem('valoraciones', JSON.stringify(actualizadas));
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/logo.1.png" alt="Logo" className="logo-img" />
          <div className="mini-perfil">
            <img src={avatarSrc} 
                alt="Avatar" 
                className="mini-avatar" 
                onClick={() => navigate('/perfil')}
                style={{ cursor: 'pointer' }}
              />
            <div className="mini-info">
              <h4>{nombre}</h4>
            </div>
          </div>

          <nav className="sidebar-menu">
            {opcionesSidebar.map((opcion, i) => (
              <button
                key={i}
                onClick={() => {
                  if (opcion === "General") navigate("/");
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

          <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <div className="setting-group" style={{ marginBottom: '0.8rem' }}>
              <label>Tu valoración</label>
              <div>
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRating(v)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: v <= rating ? '#00ffff' : 'rgba(255,255,255,0.4)'
                    }}
                    aria-label={`Valorar con ${v} estrellas`}
                  >★</button>
                ))}
              </div>
            </div>
            <div className="setting-group">
              <label>Comentario</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: '#f0f0f0',
                  padding: '0.75rem'
                }}
                placeholder="Escribe tu opinión..."
              />
            </div>
            <button className="guardar" type="submit">Enviar valoración</button>
          </form>

          <ul className="valoraciones-lista">
            {lista.map((review) => (
              <li key={review.id} className="valoracion-item">
                <img src={review.imagen} alt={`Avatar de ${review.nombre}`} className="valoracion-avatar-img" />
                <div className="valoracion-info">
                  <h4>{review.nombre}</h4>
                  <div className="valoracion-estrellas">{review.estrellas}</div>
                  <p>{review.comentario}</p>
                  <small style={{ color: '#9aa0a6' }}>{review.fecha}</small>
                </div>
                <div className="sugerencia-actions" style={{ position: 'absolute', right: 8, bottom: 8 }}>
                  <button className="sugerencia-borrar" onClick={() => handleDelete(review.id)}>Borrar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
