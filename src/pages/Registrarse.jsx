import Header from '../components/Header';

function Registrarse() {
  return (
    <>
      <Header />
      <main className="pagina">
        <h2>Registrarse</h2>
        <form>
          <input type="text" placeholder="Nombre completo" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Crear cuenta</button>
        </form>
      </main>
    </>
  );
}

export default Registrarse;
