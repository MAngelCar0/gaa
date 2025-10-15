import Carrusel from './components/Carrusel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Consolas from './pages/Consolas';
import Accesorios from './pages/Accesorios';
import Figuras from './pages/Figuras';
import Ropa from './pages/Ropa';
import Perifericos from './pages/Perifericos';
import Videojuegos from './pages/Videojuegos';
import IniciarSesion from './pages/Iniciar-Sesion';
import Registrarse from './pages/Registrarse';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/consolas" element={<Consolas />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/figuras" element={<Figuras />} />
        <Route path="/ropa" element={<Ropa />} />
        <Route path="/perifericos" element={<Perifericos />} />
        <Route path="/videojuegos" element={<Videojuegos />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/Carrusel" element={<Registrarse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

