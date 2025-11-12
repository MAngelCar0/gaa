import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Consolas({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/JSON/consolas/alkosto_consolas.json').then(res => res.json()),
      fetch('/JSON/consolas/productos_consolas_la_casa_del_play.json').then(res => res.json())
    ])
      .then(([alkosto, laCasaDelPlay]) => {
        const todosLosProductos = [...alkosto, ...laCasaDelPlay];

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
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} />
      <Tiendas />
    </>
  );
}

export default Consolas;
