import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logos">
          {[
          ].map((nombre, index) => (
            <div key={index} className="footer-logo-item">
              <img src={`/${nombre}.png`} alt={nombre} />
              <span>{nombre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-column">
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <a href="#">Política de privacidad</a>
          <a href="#">Términos de servicio</a>
        </div>

        <div className="footer-column">
          <h4>Social</h4>
          <div className="footer-social-icons">
            <i className="icon discord" />
            <i className="icon twitter" />
            <i className="icon instagram" />
          </div>
        </div>

        <div className="footer-column">
          <h4>Contacto</h4>
          <p>Email: contacto@example.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>
      </div>

      <p className="footer-copy">© 2025 Studio. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;