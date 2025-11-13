import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Accesorios() {
  const [productos, setProductos] = useState([]);

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

        setProductos(productosMezclados);
      })
      .catch(err => console.error('Error al cargar accesorios:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} />
      <Tiendas />
    </>
  );
}

export default Accesorios;