import './Productos.css'
import { Link } from 'react-router-dom'

function Productos({ productos }) {
    // Datos de ejemplo para las tarjetas de juegos mostradas en la imagen
    const tarjetasDestacadas = [
        {
            id: 1,
            imagen: "/PS2.jpg",
            titulo: "Producto 1",
            descripcion: "Descripcion 1",
            link: "#"
        },
        {
            id: 2,
            imagen: "/MK.png",
            titulo: "Producto 2",
            descripcion: "Descripcion 2",
            link: "#"
        },
        {
            id: 3,
            imagen: "/DOOM.jpg",
            titulo: "Producto 3",
            descripcion: "Descripcion 3",
            link: "#"
        },
        {
            id: 4,
            imagen: "/Camisa.jpg",
            titulo: "Producto 4",
            descripcion: "Descripcion 4",
            link: "#"
        }
    ];

    return (
        <>
            {/* Tarjetas destacadas en estilo de la imagen */}
            <div className="tarjetas-container">
                {tarjetasDestacadas.map((tarjeta) => (
                    <Link
                        key={tarjeta.id}
                        to={`/producto/${tarjeta.id}`}
                        state={{ producto: tarjeta }}
                        className="tarjeta-destacada"
                    >
                        <div className="tarjeta-imagen">
                            <img src={tarjeta.imagen} alt={tarjeta.titulo} />
                        </div>
                        <div className="tarjeta-contenido">
                            <h3 className="tarjeta-titulo">{tarjeta.titulo}</h3>
                            <p className="tarjeta-descripcion">{tarjeta.descripcion}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Sección de productos existente */}
            <section className="productos">
                {productos && productos.map((producto) => (
                    <div key={producto.id} className="producto-card">
                        <div className="image-container">
                            <img src={producto.image} alt={producto.title} className="animated-img" />
                        </div>
                        <h2>{producto.title}</h2>
                        <a href={producto.link}>Ver más</a>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Productos;