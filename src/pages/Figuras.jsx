import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Figuras() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/JSON/figuras/figuras.json').then(res => res.json()),
      fetch('/JSON/figuras/figuras1.json').then(res => res.json())
    ])
      .then(([data1, data2]) => {
        const todosLosProductos = [...data1, ...data2];

        // Mezclar aleatoriamente
        const productosMezclados = todosLosProductos.sort(() => Math.random() - 0.5);

        setProductos(productosMezclados);
      })
      .catch(err => console.error('Error al cargar figuras:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} />
      <Tiendas />
    </>
  );
}

export default Figuras;