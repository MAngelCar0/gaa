import Header from '../components/Header';
import Carrusel from '../components/Carrusel';
import Productos from '../components/Productos';
import { Tiendas } from '../components/Tiendas';
import SeccionNoticias from '../components/SeccionNoticias';
import Footer from '../components/Footer';
import IniciarSesion from '../pages/IniciarSesion';
import Registrarse from '../pages/Registrarse';
import { useEffect, useState } from 'react';


function Index({ onSeleccionarFavorito }) {
  const [noticias, setNoticias] = useState([]);
  const [todasNoticias, setTodasNoticias] = useState([]);

  useEffect(() => {
    fetch('/JSON/noticias/noticias_anmosugoi.json')
      .then((res) => res.json())
      .then((data) => {
        const validas = Array.isArray(data) ? data.filter((n) => n && n.image_url) : [];
        setNoticias(validas.slice(0, 4));
        setTodasNoticias(validas);
      })
      .catch(() => {
        setNoticias([]);
        setTodasNoticias([]);
      });
  }, []);

  return (
    <>
      <Header />
      <Carrusel slides={noticias} />
      <SeccionNoticias noticias={todasNoticias} />
        <Productos productos={[]} onSeleccionarFavorito={onSeleccionarFavorito} />
        <Tiendas />
    </>
  );
}

export default Index;
