import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Ropa() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/JSON/ropa/ropa.json').then(res => res.json()),
      fetch('/JSON/ropa/prendas.json').then(res => res.json())
    ])
      .then(([ropa, prendas]) => {
        const todasLasPrendas = [...ropa, ...prendas];

        // Mezclar aleatoriamente
        const prendasMezcladas = todasLasPrendas.sort(() => Math.random() - 0.5);

        setProductos(prendasMezcladas);
      })
      .catch(err => console.error('Error al cargar ropa:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} />
      <Tiendas />
    </>
  );
}

export default Ropa;