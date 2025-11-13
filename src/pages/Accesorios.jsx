import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Accesorios({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      fetch('/JSON/accesorios/accesorios.json').then(res => res.json()),
      fetch('/JSON/accesorios/accesorios1.json').then(res => res.json()),
      fetch('/JSON/accesorios/accesorios2.json').then(res => res.json()),
      fetch('/JSON/accesorios/productos_accesorios_la_casa_del_play.json').then(res => res.json()),
    ])
      .then(([data1, data2, data3, data4]) => {
        const todosLosProductos = [...data1, ...data2, ...data3, ...data4];

        const productosMezclados = todosLosProductos .sort(() => Math.random() - 0.5);

        // Asignar id único por producto (preferimos redireccion_url, luego image_url, luego title)
        const productosConId = productosMezclados.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));

        setProductos(productosConId);
      })
      .catch(err => console.error('Error al cargar accesorios:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default Accesorios;