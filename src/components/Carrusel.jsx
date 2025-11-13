import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import './Carrusel.css';

// Use public files
const images = [
  '/logo.1.png',
  '/vite.svg',
  '/extraer o generar un.png'
];

export default function Carrusel({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const sources = slides && slides.length ? slides.map(s => s.image_url) : images;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sources.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sources.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate every 4 seconds
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === sources.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [sources.length]);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="carousel">
      <button className="nav left" onClick={() => { prevSlide(); clearInterval(intervalRef.current); }}>❮</button>
      <div className="carousel-slide">
        {slides && slides.length ? (
          slides[currentIndex]?.redireccion_url ? (
          <a href={slides[currentIndex].redireccion_url} target="_blank" rel="noopener noreferrer">
            <img src={sources[currentIndex]} alt={slides[currentIndex]?.title || `Slide ${currentIndex + 1}`} className="carousel-image" />
          </a>
          ) : (
            <img src={sources[currentIndex]} alt={slides[currentIndex]?.title || `Slide ${currentIndex + 1}`} className="carousel-image" />
          )
        ) : (
          <img src={sources[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        )}
        {slides && slides.length ? (
          <div className="carousel-caption">
            <div className="caption-title">{slides[currentIndex]?.title || ''}</div>
            {slides[currentIndex]?.category ? (
              <div className="caption-subtitle">{slides[currentIndex].category}</div>
            ) : null}
          </div>
        ) : null}
      </div>
      <button className="nav right" onClick={() => { nextSlide(); clearInterval(intervalRef.current); }}>❯</button>

      <div className="carousel-indicators">
        {sources.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => { setCurrentIndex(idx); clearInterval(intervalRef.current); }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
