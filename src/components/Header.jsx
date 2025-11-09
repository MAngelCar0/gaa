import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContextoUsuario } from '../pages/ContextoUsuario';
import './Header.css';

function Header() {
  const { datos, avatar } = useContext(ContextoUsuario);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/perfil');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo-container">
          <Link className="header-logo" to="/">
            <img src="/logo.1.png" alt="Logo" />
          </Link>
        </div>
        <div className="header-busqueda">
          <input
            className="header-input"
            type="text"
            placeholder="Buscar producto..."
          />
          <button className="header-buscar">Buscar</button>
        </div>

        <div className="header-user">
          {datos?.nombre ? (
            <div className="header-user-info" onClick={handleAvatarClick}>
              <img
                className="header-user-img"
                src={avatar || '/logo.1.png'}
                alt="Avatar"
              />
              <span className="header-user-name">{datos.nombre}</span>
            </div>
          ) : (
            <div className="header-auth">
              <Link className="header-user-action iniciar" to="/iniciar-sesion">
                Iniciar sesión
              </Link>
              <Link className="header-user-action registrar" to="/registrarse">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav className="header-categorias">
        <Link className="header-categoria" to="/videojuegos">Videojuegos</Link>
        <Link className="header-categoria" to="/consolas">Consolas</Link>
        <Link className="header-categoria" to="/accesorios">Accesorios</Link>
        <Link className="header-categoria" to="/perifericos">Periféricos</Link>
        <Link className="header-categoria" to="/figuras">Figuras</Link>
        <Link className="header-categoria" to="/ropa">Ropa</Link>
        <Link className="header-categoria" to="/libro-mangas">Libros/Mangas</Link>
      </nav>
    </header>
  );
}

export default Header;
