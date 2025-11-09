import './Productos.css';

function Productos({ productos }) {
  // Usamos los primeros 4 productos como destacados
  const tarjetasDestacadas = productos.slice(0, 4);

  return (
    <>
      {/* Tarjetas destacadas desde JSON */}
      <div className="tarjetas-container">
        {tarjetasDestacadas.map((tarjeta, index) => (
          <a
            key={index}
            href={tarjeta.redireccion_url}
            target="_blank"
            rel="noopener noreferrer"
            className="tarjeta-destacada"
          >
            <div className="tarjeta-imagen">
              <img src={tarjeta.image_url} alt={tarjeta.title} />
            </div>
            <div className="tarjeta-contenido">
              <h3 className="tarjeta-titulo">{tarjeta.title}</h3>
              <p className="tarjeta-descripcion">{tarjeta.price}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Resto de productos desde JSON */}
<section className="productos">
  {productos.map((producto, index) => (
    <a
      key={index}
      href={producto.redireccion_url}
      target="_blank"
      rel="noopener noreferrer"
      className="producto-card"
    >
      <div className="image-container">
        <img src={producto.image_url} alt={producto.title} />
      </div>
      <div className="producto-contenido">
        <h2>{producto.title}</h2>
        <p>{producto.price}</p>
      </div>
    </a>
  ))}
</section>
    </>
  );
}

export default Productos;