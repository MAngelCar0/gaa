import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Perifericos({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      fetch('/JSON/perifericos/productos_alkosto_perifericos.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericos_la_casa_del_play.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericos3_la_casa_del_play.json').then(res => res.json()),
      fetch('/JSON/perifericos/productos_perifericosv_la_casa_del_play.json').then(res => res.json())
    ])
      .then(([alkosto, laCasaDelPlay, productos3, productosv]) => {
        const todosLosProductos = [...alkosto, ...laCasaDelPlay, ...productos3, ...productosv];

        // Mezclar aleatoriamente
        const productosMezclados = todosLosProductos.sort(() => Math.random() - 0.5);

        const productosConId = productosMezclados.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));

        setProductos(productosConId);
      })
      .catch(err => console.error('Error al cargar consolas:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default Perifericos;
