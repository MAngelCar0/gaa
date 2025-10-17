import './Registrarse.css';

function Registrarse() {
  return (
    <>
      <main className="form-container">
        <h2 className="form-title">Registrarse</h2>
        <form>
          <input className="form-input" type="text" placeholder="Nombre de Ususario" />
          <input className="form-input" type="email" placeholder="Correo electrónico" />
          <input className="form-input" type="password" placeholder="Contraseña" />
          <input className="form-input" type="password" placeholder="Confirmar contraseña" />
          <section className="form-redes">
            <h3 className="form-redes-title">Registrarse con redes sociales</h3>
            <div className="form-redes-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </section>
          <p className="form-agreement">
            Al registrarte, aceptas nuestras <a href="/terminos">condiciones de uso</a> y <a href="/privacidad">política de privacidad</a>.
          </p>
            <label className="form-checkbox">
            <input type="checkbox" />
            Aceptar términos y condiciones
          </label>
          <button className="form-button" type="submit">Crear cuenta</button>
        </form>
      </main>
    </>
  );
}

export default Registrarse;
