import React from 'react';
import Header from '../components/Header';
import Productos from '../components/Productos';
import './Favoritos.css';

export default function Favoritos({ favoritos, onSeleccionarFavorito }) {
  return (
    <>
      <Header />
      <main style={{ padding: '0 20px' }}>
        <h2 style={{ color: 'var(--purple-light)' }}>Favoritos</h2>
        {favoritos && favoritos.length > 0 ? (
          <Productos productos={favoritos} onSeleccionarFavorito={onSeleccionarFavorito} modoFavoritos={true} />
        ) : (
          <p>Aquí se mostrarán tus productos favoritos cuando los agregues desde las tarjetas.</p>
        )}
      </main>
    </>
  );
}