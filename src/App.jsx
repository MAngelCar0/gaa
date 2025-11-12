import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorUsuario } from './pages/ContextoUsuario';
import Footer from "./components/Footer";

import Accesorios from "./pages/Accesorios";
import Carrusel from "./components/Carrusel";
import CentroAyuda from "./pages/CentroAyuda";
import Consolas from "./pages/Consolas";
import Figuras from "./pages/Figuras";
import Favoritos from "./pages/Favoritos";
import Index from "./pages/Index";
import IniciarSesion from "./pages/IniciarSesion";
import LibrosManga from "./pages/LibrosManga";
import Perifericos from "./pages/Perifericos";
import PerfilDeUsuario from "./pages/PerfilDeUsuario";
import Registrarse from "./pages/Registrarse";
import Ropa from "./pages/Ropa";
import Sugerencias from "./pages/Sugerencias";
import Valoraciones from "./pages/Valoraciones";
import Videojuegos from "./pages/Videojuegos";

import "./App.css";

function App() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("misFavoritos");
    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("misFavoritos", JSON.stringify(favoritos));
    // Notifica a toda la app que los favoritos han cambiado
    try {
      window.dispatchEvent(new CustomEvent('favoritosActualizados', { detail: { count: favoritos.length } }));
    } catch {}
  }, [favoritos]);

  const manejarFavorito = (producto, activo) => {
    setFavoritos((prev) => {
      if (activo) {
        const existe = prev.some((p) => p.id === producto.id);
        return existe ? prev : [...prev, producto];
      } else {
        return prev.filter((p) => p.id !== producto.id);
      }
    });
  };

  return (
    <BrowserRouter>
      <ProveedorUsuario>
        <Routes>
          <Route path="/" element={<Index onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/consolas" element={<Consolas onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/accesorios" element={<Accesorios onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/figuras" element={<Figuras onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/ropa" element={<Ropa onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/libro-mangas" element={<LibrosManga onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/perifericos" element={<Perifericos onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/videojuegos" element={<Videojuegos onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/carrusel" element={<Carrusel />} />
          <Route path="/perfil" element={<PerfilDeUsuario />} />
          <Route path="/favoritos" element={<Favoritos favoritos={favoritos} onSeleccionarFavorito={manejarFavorito} />} />
          <Route path="/valoraciones" element={<Valoraciones />} />
          <Route path="/ayuda" element={<CentroAyuda />} />
          <Route path="/sugerencias" element={<Sugerencias />} />
        </Routes>
        <Footer />
      </ProveedorUsuario>
    </BrowserRouter>
  );
}

export default App;