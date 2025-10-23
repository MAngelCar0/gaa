import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from './ContextoUsuario';
import './CentroAyuda.css';

const opcionesSidebar = [
  'General',
  'Favoritos',
  'Valoraciones',
  'Centro de ayuda',
  'Sugerencias',
];

const CentroAyuda = () => {
  const navigate = useNavigate();
  const { datos, avatar, setDatos, setAvatar } = useContext(ContextoUsuario);
  const [mostrarModal, setMostrarModal] = useState(false);
  const modalRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('avatarUsuario');
    
    if (setDatos) setDatos({});
    if (setAvatar) setAvatar(null);
    
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setMostrarModal(false);
      }
    };

    if (mostrarModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarModal]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/Logo.jpg" alt="Logo" className="logo-img" />

          <div className="mini-perfil">
            {avatar && <img 
  src={avatar} 
  alt="Avatar" 
  className="mini-avatar" 
  onClick={() => navigate('/perfil')}
  style={{ cursor: 'pointer' }}
/>}
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
                  if (opcion === 'General') navigate('/');
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

      <main className="perfil ayuda">
        <h2>Centro de ayuda</h2>
        <p>¿Tienes dudas, problemas o necesitas orientación? Aquí encontrarás respuestas y formas de contactarnos.</p>

        <input type="text" placeholder="Buscar una pregunta..." className="buscador-ayuda" />

        <section className="faq-categorias">
          <div className="categoria">
            <h3>Cuenta y perfil</h3>
            <ul>
              <li>¿Cómo cambio mi avatar?</li>
              <li>¿Cómo edito mi nombre de usuario?</li>
            </ul>
          </div>

          <div className="categoria">
            <h3>Favoritos y valoraciones</h3>
            <ul>
              <li>¿Cómo agrego un producto a favoritos?</li>
              <li>¿Dónde veo mis valoraciones?</li>
            </ul>
          </div>

          <div className="categoria">
            <h3>Soporte técnico</h3>
            <ul>
              <li>La app no carga correctamente</li>
              <li>¿Cómo reporto un error?</li>
            </ul>
          </div>
        </section>

        <button className="contacto-btn" onClick={() => setMostrarModal(true)}>
          Contactar soporte
        </button>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-contenido" ref={modalRef}>
              <h3>¿Cómo deseas contactarnos?</h3>
              <ul>
                <li><strong>📧 Correo:</strong> soporte@tuapp.com</li>
                <li><strong>💬 WhatsApp:</strong> +57 300 123 4567</li>
                <li><strong>📨 Formulario:</strong> <button>Enviar mensaje</button></li>
              </ul>
              <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CentroAyuda;
