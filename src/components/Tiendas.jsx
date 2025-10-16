import React from 'react';
import './Tiendas.css';

 export const Tiendas = () => {
  const tiendas = [
    { id: 1, nombre: 'CoachTravel', imagen: '/CoachTravel.png' },
    { id: 2, nombre: 'FOTOCAL', imagen: '/FOTOCAL.png' },
    { id: 3, nombre: 'iX Shine', imagen: '/iXShine.png' },
    { id: 4, nombre: 'Mimi', imagen: '/Mimi.png' },
    { id: 5, nombre: 'OTAKU HEAVEN', imagen: '/OTAKUHEAVEN.png' },
    { id: 6, nombre: 'SUGOI', imagen: '/SUGOI.png' },
    { id: 7, nombre: 'ZenMarket', imagen: '/ZenMarket.png' },
    { id: 8, nombre: 'weplay', imagen: '/weplay.png' },
    { id: 9, nombre: 'Hebrew Brand', imagen: '/HebrewBrand.png' }
  ];

  return (
    <section className="tiendas-section">
      <h2 className="tiendas-titulo">Lo Que Puedes Encontrar</h2>
      <div className="tiendas-container">
        {tiendas.map((tienda) => (
          <div key={tienda.id} className="tienda-item">
            <img src={tienda.imagen} alt={tienda.nombre} />
            <div className="tienda-overlay">
              <span>{tienda.nombre}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

