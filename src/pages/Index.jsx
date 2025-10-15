import Header from '../components/Header';
import Carrusel from '../components/Carrusel';
import Productos from '../components/Productos';
import Tiendas from '../components/Tiendas';

function Index() {
  return (
    <>
      <Header />
      <Carrusel />
      <main style={{ padding: '20px', color: '#bffcff' }}>
        <h2>Bienvenido a GM</h2>
        <p>Explora nuestras categorías usando el menú de arriba.</p>
        
        {/* Agregamos el componente de Productos para mostrar las tarjetas */}
        <Productos productos={[]} />
        
        {/* Agregamos el componente de Tiendas */}
        <Tiendas />
      </main>
    </>
  );
}

export default Index;
