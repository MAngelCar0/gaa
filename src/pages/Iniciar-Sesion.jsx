import Header from '../components/Header';

function IniciarSesion() {
  return (
    <>
      <Header />
      <main className="pagina">
        <h2>Iniciar Sesión</h2>
        <form>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}

export default IniciarSesion;
