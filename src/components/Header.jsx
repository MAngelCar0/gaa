import './Header.css'
function Header() {
  return (
    <header className="header">
      <a className="header-logo" href=""></a>
      <div className="header-busqueda">
        <button className="header-buscar"></button>
        <input className="header-input" type="text" placeholder="bucar producto..."/>
      </div >
      <a className="header-user-action" href="">Iniciar sesion</a>
      <a className="header-user-action" href="">Registrarse</a>
      <nav className="header-categorias">
        <a className="header-categoria" href=""></a>
        <a className="header-categoria" href=""></a>
        <a className="header-categoria" href=""></a>
        <a className="header-categoria" href=""></a>
        <a className="header-categoria" href=""></a>
        <a className="header-categoria" href=""></a>
      </nav>
    </header>
  )
}

export default Header