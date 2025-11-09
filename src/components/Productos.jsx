import './Productos.css';

function Productos({ productos }) {
  // Tarjetas destacadas con redirección directa
  const tarjetasDestacadas = [
    {
      id: 1,
      imagen: "/PS2.jpg",
      titulo: "Producto 1",
      descripcion: "Descripcion 1",
      link: "https://ejemplo.com/producto1"
    },
    {
      id: 2,
      imagen: "/MK.png",
      titulo: "Producto 2",
      descripcion: "Descripcion 2",
      link: "https://ejemplo.com/producto2"
    },
    {
      id: 3,
      imagen: "/DOOM.jpg",
      titulo: "Producto 3",
      descripcion: "Descripcion 3",
      link: "https://ejemplo.com/producto3"
    },
    {
      id: 4,
      imagen: "/Camisa.jpg",
      titulo: "Producto 4",
      descripcion: "Descripcion 4",
      link: "https://ejemplo.com/producto4"
    }
  ];

  return (
    <>
      {/* Tarjetas destacadas con <a> */}
      <div className="tarjetas-container">
        {tarjetasDestacadas.map((tarjeta) => (
          <a
            key={tarjeta.id}
            href={tarjeta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="tarjeta-destacada"
          >
            <div className="tarjeta-imagen">
              <img src={tarjeta.imagen} alt={tarjeta.titulo} />
            </div>
            <div className="tarjeta-contenido">
              <h3 className="tarjeta-titulo">{tarjeta.titulo}</h3>
              <p className="tarjeta-descripcion">{tarjeta.descripcion}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Productos desde JSON */}
      <section className="productos">
        {productos && productos.map((producto, index) => (
          <div key={index} className="producto-card">
            <div className="image-container">
              <img src={producto.image_url} alt={producto.title} className="animated-img" />
            </div>
            <h2>{producto.title}</h2>
            <p>{producto.price}</p>
            <a
              href={producto.redireccion_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver más
            </a>
          </div>
        ))}
      </section>
    </>
  );
}

export default Productos;