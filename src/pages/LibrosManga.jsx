import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';

function LibrosManga({ onSeleccionarFavorito }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    Promise.all([
      fetch('/JSON/libros/comic.json').then(res => res.json()),
      fetch('/JSON/libros/comics.json').then(res => res.json()),
      fetch('/JSON/libros/manga.json').then(res => res.json()),
      fetch('/JSON/libros/mangas.json').then(res => res.json()),
      fetch('/JSON/libros/mangas1.json').then(res => res.json())
    ])
      .then(([comic, comics, manga, mangas, mangas1]) => {
        const todosLosLibros = [...comic, ...comics, ...manga, ...mangas, ...mangas1];

        // Mezclar aleatoriamente
        const librosMezclados = todosLosLibros.sort(() => Math.random() - 0.5);

        const librosConId = librosMezclados.map(p => ({
          ...p,
          id: p.id ?? p.redireccion_url ?? p.image_url ?? p.title,
        }));

        setProductos(librosConId);
      })
      .catch(err => console.error('Error al cargar libros y mangas:', err));
  }, []);

  return (
    <>
      <Header />
      <Productos productos={productos} onSeleccionarFavorito={onSeleccionarFavorito} filtroTexto={q} />
      <Tiendas />
    </>
  );
}

export default LibrosManga;