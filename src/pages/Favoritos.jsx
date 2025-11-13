import React from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import '../components/Productos.css';

export default function Favoritos({ favoritos, onSeleccionarFavorito }) {
  return (
    <>
      <Header />
      <main style={{ padding: '0 20px' }}>
        <Productos productos={favoritos || []} onSeleccionarFavorito={onSeleccionarFavorito} modoFavoritos={true} />
      </main>
    </>
  );
}