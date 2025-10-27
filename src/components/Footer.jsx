import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4 className="footer-title">Contacto</h4>
        <div className="footer-section">
          <p className="footer-span">Email: contacto@example.com</p>
          <p className="footer-span">Teléfono: +123 456 7890</p>
        </div>
        <h4 className="footer-title">Redes Sociales</h4>
        <div className="footer-section">
          <img className="footer-icon" src="" alt="" />
          <img className="footer-icon" src="" alt="" />
          <img className="footer-icon" src="" alt="" />
        </div>
        <h4 className="footer-title">Legal</h4>
        <div className="footer-section">
          <a className="footer-text">Política de Privacidad</a>
          <a className="footer-text">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
