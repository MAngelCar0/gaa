import { Link,useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ContextoUsuario } from '../pages/ContextoUsuario';
import './Header.css';

function Header() {
  const { datos, avatar } = useContext(ContextoUsuario);
  const navigate = useNavigate();
  const location = useLocation();
  const [favoritosCount, setFavoritosCount] = useState(0);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const leerCount = () => {
      try {
        const guardados = JSON.parse(localStorage.getItem('misFavoritos') || '[]');
        setFavoritosCount(Array.isArray(guardados) ? guardados.length : 0);
      } catch {
        setFavoritosCount(0);
      }
    };
    leerCount();
    const onUpdate = (e) => {
      if (e?.detail?.count !== undefined) {
        setFavoritosCount(e.detail.count);
      } else {
        leerCount();
      }
    };
    window.addEventListener('favoritosActualizados', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('favoritosActualizados', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setBusqueda(q);
  }, [location.search]);

  const handleSearch = () => {
    const q = busqueda.trim();
    const destino = detectarRutaPorTexto(busqueda);
    if (!q) {
      navigate('/');
      return;
    }
    if (destino) {
      navigate(`${destino}?q=${encodeURIComponent(q)}`);
    } else {
      navigate(`/buscar?q=${encodeURIComponent(q)}`);
    }
  };

  const detectarRutaPorTexto = (texto) => {
    const s = (texto || '').toLowerCase();
    const mapas = [
      { ruta: '/videojuegos', keys: [
        'juego','juegos','videojuego','videojuegos','game','games','gaming','playstation','ps','psn','xbox','nintendo','switch','ps5','ps4','xbox-series-x','xbox-series-s','xbox-one','series x','series s','one','steam','epic','uplay','origin','battle.net','pc','digital','fisico','físico','retro','arcade','cartucho','dlc','expansion','expansión','demo'
      ] },
      { ruta: '/consolas', keys: [
        'consola','consolas','ps5','ps4','play','playstation 5','playstation 4','ps3','ps2','ps1','xbox','xbox one','xbox 360','series x','series s','switch','switch oled','switch lite','nintendo','wii','wii u','gamecube','3ds','ds','nes','snes','megadrive','dreamcast','handheld','portatil','portátil'
      ] },
      { ruta: '/ropa', keys: [
        'ropa','camisa','camiseta','playera','remera','polera','hoodie','hoodies','buzo','sudadera','chaqueta','pantalon','pantalón','polo','t-shirt','jersey','gorra','medias','calcetines','bufanda','guantes','kimono'
      ] },
      { ruta: '/accesorios', keys: [
        'accesorio','accesorios','merch','merchandise','pin','pins','collar','colgante','llavero','llaveros','mug','taza','vaso','termo','monedero','pulsera','anillo','arete','aretes','pendiente','poster','póster','stickers','pegatina','carcasa'
      ] },
      { ruta: '/figuras', keys: [
        'figura','figuras','funko','funkos','estatua','estatuas','modelo','model kit','maqueta','resina','nendoroid','figma','scale','gunpla','banpresto','kotobukiya','plush','peluche'
      ] },
      { ruta: '/perifericos', keys: [
        'periferico','perifericos','periférico','periféricos','mouse','raton','ratón','mousepad','pad','teclado','teclados','audifono','audifonos','auricular','auriculares','headset','monitor','monitores','webcam','microfono','micrófono','altavoz','altavoces','speakers','soundbar','silla','chair'
      ] },
      { ruta: '/libro-mangas', keys: [
        'libro','libros','manga','mangas','tomo','volumen','tankobon','cómic','comic','tebeo','novela','novela ligera','light novel','graphic novel','artbook'
      ] },
    ];
    for (const m of mapas) {
      for (const k of m.keys) {
        if (s.includes(k)) return m.ruta;
      }
    }
    return null;
  };

  

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
            value={busqueda}
            onChange={(e) => {
              const val = e.target.value;
              setBusqueda(val);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className="header-buscar" onClick={handleSearch}>Buscar</button>
        </div>

        <div className="header-user">
          {datos?.nombre ? (
            <div className="header-user-controls">
              <div className="header-user-info" onClick={handleAvatarClick}>
                <img
                  className="header-user-img"
                  src={avatar || '/logo.1.png'}
                  alt="Avatar"
                />
                <span className="header-user-name">{datos.nombre}</span>
              </div>
              <Link className="header-favoritos" to="/favoritos">
                Favoritos ({favoritosCount})
              </Link>
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
