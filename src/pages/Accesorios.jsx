import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Accesorios() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/JSON/accesorios/accesorios.json')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar accesorios:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos items={productos} />
      <Tiendas />
    </>
  );
}

export default Accesorios;