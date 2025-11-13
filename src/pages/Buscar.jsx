import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Buscar({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      // Videojuegos
      fetch('/JSON/videojuegos/productos_gamestore_pc.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_switch_dos.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_switch.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_xbox-one.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_xbox-series_xs.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestorePS4.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestoreps5.json').then(res => res.json()),
      // Consolas
      fetch('/JSON/consolas/alkosto_consolas.json').then(res => res.json()),
      fetch('/JSON/consolas/productos_consolas_la_casa_del_play.json').then(res => res.json()),
      // Accesorios
      fetch('/JSON/accesorios/accesorios.json').then(res => res.json()),
      fetch('/JSON/accesorios/accesorios1.json').then(res => res.json()),
      fetch('/JSON/accesorios/accesorios2.json').then(res => res.json()),
      fetch('/JSON/accesorios/productos_accesorios_la_casa_del_play.json').then(res => res.json()),
      // Periféricos
      fetch('/JSON/perifericos/productos_alkosto_perifericos.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericos_la_casa_del_play.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericos3_la_casa_del_play.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericosv_la_casa_del_play.json').then(res => res.json()),
      // Figuras
      fetch('/JSON/figuras/figuras.json').then(res => res.json()),
      fetch('/JSON/figuras/figuras1.json').then(res => res.json()),
      // Ropa
      fetch('/JSON/ropa/ropa.json').then(res => res.json()),
      fetch('/JSON/ropa/prendas.json').then(res => res.json()),
      // Libros/Mangas
      fetch('/JSON/libros/comic.json').then(res => res.json()),
      fetch('/JSON/libros/comics.json').then(res => res.json()),
      fetch('/JSON/libros/manga.json').then(res => res.json()),
      fetch('/JSON/libros/mangas.json').then(res => res.json()),
      fetch('/JSON/libros/mangas1.json').then(res => res.json()),
    ])
      .then((arrays) => {
        const todos = arrays.flat();
        const mezclados = todos.sort(() => Math.random() - 0.5);
        const conId = mezclados.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));
        setProductos(conId);
      })
      .catch(err => console.error('Error en búsqueda global:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default Buscar;