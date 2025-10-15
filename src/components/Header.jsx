import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <Link className="header-logo" to="/">
          <img src="/Logo.jpg" alt="Logo" />
        </Link>
        <div className="header-busqueda">
          <input className="header-input" type="text" placeholder="buscar producto..." />
          <button className="header-buscar">Buscar</button>
        </div>
        <div className="header-auth">
          <Link className="header-user-action iniciar" to="/iniciar-sesion">Iniciar sesion</Link>
          <Link className="header-user-action registrar" to="/registrarse">Registrarse</Link>
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
  )
}

export default Header