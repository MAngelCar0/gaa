import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Figuras({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      fetch('/JSON/figuras/figuras.json').then(res => res.json()),
      fetch('/JSON/figuras/figuras1.json').then(res => res.json())
    ])
      .then(([data1, data2]) => {
        const todosLosProductos = [...data1, ...data2];

        const productosMezclados = todosLosProductos.sort(() => Math.random() - 0.5);

        const productosConId = productosMezclados.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));

        setProductos(productosConId);
      })
      .catch(err => console.error('Error al cargar figuras:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default Figuras;