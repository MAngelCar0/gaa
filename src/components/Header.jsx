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
      { ruta: '/videojuegos', keys: ['juego','juegos','videojuego','videojuegos','game'] },
      { ruta: '/consolas', keys: ['consola','consolas','ps5','ps4','play','xbox','switch','nintendo'] },
      { ruta: '/ropa', keys: ['ropa','camisa','hoodie','buzo','pantalon','playera','polera'] },
      { ruta: '/accesorios', keys: ['accesorio','accesorios','pin','collar','llavero','mug','monedero'] },
      { ruta: '/figuras', keys: ['figura','figuras','funko','estatua','modelo'] },
      { ruta: '/perifericos', keys: ['periferico','perifericos','mouse','teclado','audifono','audifonos','headset','monitor'] },
      { ruta: '/libro-mangas', keys: ['libro','libros','manga','mangas','comic','novela'] },
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
