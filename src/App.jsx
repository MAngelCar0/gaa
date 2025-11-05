import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorUsuario } from "./pages/ContextoUsuario";
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
import VistaProducto from "./components/VistaProducto";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ProveedorUsuario>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consolas" element={<Consolas />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/figuras" element={<Figuras />} />
          <Route path="/ropa" element={<Ropa />} />
          <Route path="/libro-mangas" element={<LibrosManga />} />
          <Route path="/perifericos" element={<Perifericos />} />
          <Route path="/videojuegos" element={<Videojuegos />} />
          <Route path="/producto/:id" element={<VistaProducto />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/Carrusel" element={<Carrusel />} />
          <Route path="/perfil" element={<PerfilDeUsuario />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/valoraciones" element={<Valoraciones />} />
          <Route path="/ayuda" element={<CentroAyuda />} />
          <Route path="/sugerencias" element={<Sugerencias />} />
        </Routes>
      </ProveedorUsuario>
    </BrowserRouter>
  );
}

export default App;
