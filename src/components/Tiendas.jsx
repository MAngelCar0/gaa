import React from 'react';
import './Tiendas.css';

export const Tiendas = () => {
  const tiendas = [
    { id: 1, nombre: 'Nyart Kei', imagen: 'https://nyartkei.com/wp-content/uploads/2024/07/Logo-web.png', redireccion: 'https://nyartkei.com/' },
    { id: 2, nombre: 'Rock Dreams', imagen: 'https://i0.wp.com/rockdreams.com.co/wp-content/uploads/2019/08/lg-rd.png?fit=213%2C245&ssl=1', redireccion: 'https://rockdreams.com.co/' },
    { id: 3, nombre: 'La Casa Del Play', imagen: '//lacasadelplay.com.co/cdn/shop/files/Logo_Policromia_Horizontal_300px_La_Casa_del_Play.png?v=1700529391&width=250 1x, //lacasadelplay.com.co/cdn/shop/files/Logo_Policromia_Horizontal_300px_La_Casa_del_Play.png?v=1700529391&width=500 2x', redireccion: 'https://lacasadelplay.com.co/' },
    { id: 4, nombre: 'Alkosto', imagen: '/public/Alkosto.png', redireccion: 'https://www.alkosto.com.co/' },
    { id: 5, nombre: 'Akihabara', imagen: 'https://akihabaracolombia.com/wp-content/uploads/elementor/thumbs/logo_septiembre_2020_png-pngslq8q7ufrd9tciwqtdtjpuck0nuws413ad4j4v0.png', redireccion: 'https://akihabaracolombia.com/' },
    { id: 6, nombre: 'GameStore-Colombia', imagen: 'https://gamestorecolombia.com/files/images/logo.png?v=20250924062756', redireccion: 'https://gamestorecolombia.com/' },
    { id: 7, nombre: 'DogaManga', imagen: '//www.dogamanga.com/wp-content/uploads/2024/06/logo.png.webp', redireccion: 'https://www.dogamanga.com/' },
    { id: 8, nombre: 'La-Baticueva-Tienda', imagen: 'https://labaticuevatienda.com/wp-content/uploads/2024/11/cropped-cropped-LOGO_PEQUENOS.png', redireccion: 'https://labaticuevatienda.com/' },
  ];

  return (
    <section className="tiendas-section">
      <div className="tiendas-container">
        {tiendas.map((tienda) => (
          <div key={tienda.id} className="tienda-item">
            <a href={tienda.redireccion} target="_blank" rel="noopener noreferrer">
              <img src={tienda.imagen} alt={tienda.nombre} />
            </a>
            <div className="tienda-overlay">
              <span>{tienda.nombre}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};