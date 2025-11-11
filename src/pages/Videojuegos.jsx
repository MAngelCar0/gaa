import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Videojuegos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/JSON/videojuegos/productos_gamestore_pc.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_switch_dos.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_switch.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_xbox-one.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestore_xbox-series_xs.json').then(res => res.json()), // ✅ CORREGIDO
      fetch('/JSON/videojuegos/productos_gamestorePS4.json').then(res => res.json()),
      fetch('/JSON/videojuegos/productos_gamestoreps5.json').then(res => res.json())
    ])
      .then((dataArray) => {
        const todosLosProductos = dataArray.flat();
        const productosMezclados = todosLosProductos.sort(() => Math.random() - 0.5);
        setProductos(productosMezclados);
      })
      .catch(err => console.error('Error al cargar consolas:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} />
      <Tiendas />
    </>
  );
}

export default Videojuegos;
