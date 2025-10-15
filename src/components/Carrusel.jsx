import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import './Carrusel.css';

// Use public files (URL-encode filenames with spaces)
const images = [
  '/Logo.jpg',
  '/vite.svg',
  '/extraer%20o%20generar%20un.png'
];

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate every 4 seconds
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className="carousel">
      <button className="nav left" onClick={() => { prevSlide(); clearInterval(intervalRef.current); }}>❮</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
      <button className="nav right" onClick={() => { nextSlide(); clearInterval(intervalRef.current); }}>❯</button>

      <div className="carousel-indicators">
        {images.map((_, idx) => (
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