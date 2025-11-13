import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function Ropa({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      fetch('/JSON/ropa/ropa.json').then(res => res.json()),
      fetch('/JSON/ropa/prendas.json').then(res => res.json())
    ])
      .then(([ropa, prendas]) => {
        const todasLasPrendas = [...ropa, ...prendas];

        // Mezclar aleatoriamente
        const prendasMezcladas = todasLasPrendas.sort(() => Math.random() - 0.5);

        const prendasConId = prendasMezcladas.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));

        setProductos(prendasConId);
      })
      .catch(err => console.error('Error al cargar ropa:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default Ropa;