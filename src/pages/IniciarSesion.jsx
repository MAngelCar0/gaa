
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContextoUsuario } from "./ContextoUsuario";
import "./IniciarSesion.css";

function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setDatos, setAvatar } = useContext(ContextoUsuario);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const usuariosJSON = localStorage.getItem("users");
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      const usuario = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (!usuario) {
        setError("Correo o contraseña incorrectos");
        setLoading(false);
        return;
      }

      const datosUsuario = { nombre: usuario.name, email: usuario.email };
      localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

      if (usuario.avatar)
        localStorage.setItem("avatarUsuario", usuario.avatar);
      else localStorage.removeItem("avatarUsuario");

      if (setDatos) setDatos(datosUsuario);
      if (setAvatar) setAvatar(usuario.avatar || null);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    }, 1500);
  };

  return (
    <>
      <main className="Form-loging">
        <Link className="Form-loging-logo" to="/">
          <img src="/logo.1.png" alt="Logo GAA" />
        </Link>
        <h2 className="Form-loging-title">Iniciar Sesión</h2>
        <form onSubmit={onSubmit}>
          <input
            className="Form-loging-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="Form-loging-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="Form-loging-redes">
            <p>Inicia sesión con</p>
            <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>📘</span>
            <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>🐦</span>
            <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>📷</span>
          </div>

          <p className="Form-loging-recuperar">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/recuperar-contrasena">Recupérala aquí</a>
          </p>
          <p className="Form-loging-registrar">
            ¿No tienes cuenta? <a href="/registrarse">Regístrate aquí</a>
          </p>

          <button className="Form-loging-button" type="submit">
            Entrar
          </button>
          {error && <p style={{ color: "salmon", textAlign: "center" }}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default IniciarSesion;
