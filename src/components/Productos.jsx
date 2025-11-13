import { useState, useEffect } from "react";
import "./Productos.css";

function Productos({ productos, onSeleccionarFavorito, filtroTexto = "" }) {
  // Estado local para manejar los corazones activos
  const [favoritos, setFavoritos] = useState({});
  const [fadeClass, setFadeClass] = useState("");
  useEffect(() => {
    setFadeClass("fade-in");
    const t = setTimeout(() => setFadeClass(""), 300);
    return () => clearTimeout(t);
  }, [filtroTexto]);

  // Sincroniza el estado local de corazones con lo guardado en localStorage
  useEffect(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem("misFavoritos") || "[]");
      const idsFavoritos = new Set(guardados.map((p) => p.id ?? p.redireccion_url ?? p.image_url ?? p.title));
      const inicial = {};
      for (const p of productos) {
        const itemId = p.id ?? p.redireccion_url ?? p.image_url ?? p.title;
        inicial[itemId] = idsFavoritos.has(itemId);
      }
      setFavoritos(inicial);
    } catch (err) {
      // Si hay algún error de parseo, mantenemos vacío
      console.error("Error leyendo favoritos iniciales", err);
    }
  }, [productos]);

  const texto = (filtroTexto || "").toLowerCase().trim();
  const productosFiltrados = texto
    ? productos.filter((p) => (p.title || "").toLowerCase().includes(texto))
    : productos;
  const tarjetasDestacadas = productosFiltrados.slice(0, 4);
  const restoDeProductos = productosFiltrados.slice(4);

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const itemId = producto.id ?? producto.redireccion_url ?? producto.image_url ?? producto.title;
      const nuevoEstado = { ...prev, [itemId]: !prev[itemId] };

      // Si se pasa una función, la ejecutamos (seguridad extra)
      if (typeof onSeleccionarFavorito === "function") {
        const productoConId = { ...producto, id: itemId };
        onSeleccionarFavorito(productoConId, nuevoEstado[itemId]);
      }

      return nuevoEstado;
    });
  };

  const renderTarjeta = (item, tipo) => {
    const itemId = item.id ?? item.redireccion_url ?? item.image_url ?? item.title;
    const esFavorito = favoritos[itemId];

    return (
      <div key={itemId} className={tipo}>
        <div className="image-container">
          <img src={item.image_url} alt={item.title} loading="lazy" decoding="async" />

          <button
            className={`btn-corazon ${esFavorito ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorito(item);
            }}
          >
            +
          </button>
        </div>

        <a
          href={item.redireccion_url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            tipo === "tarjeta-destacada"
              ? "tarjeta-contenido"
              : "producto-contenido"
          }
        >
          <h3
            className={tipo === "tarjeta-destacada" ? "tarjeta-titulo" : ""}
          >
            {item.title}
          </h3>
          <p
            className={tipo === "tarjeta-destacada" ? "tarjeta-descripcion" : ""}
          >
            {item.price}
          </p>
        </a>
      </div>
    );
  };

  return (
    <div className={`productos-transition ${fadeClass}`}>
      {/* Tarjetas destacadas */}
      <div className="tarjetas-container">
        {tarjetasDestacadas.map((tarjeta) =>
          renderTarjeta(tarjeta, "tarjeta-destacada")
        )}
      </div>

      {/* Resto de productos */}
      <section className="productos">
        {restoDeProductos.map((producto) =>
          renderTarjeta(producto, "producto-card")
        )}
      </section>
    </div>
  );
}

export default Productos;
