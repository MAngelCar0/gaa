import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContextoUsuario } from "./ContextoUsuario";
import "./Registrarse.css";
import Header from "../components/Header";
import PantallaCarga from "../components/PantallaCarga";

function Registrarse() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setDatos, setAvatar } = useContext(ContextoUsuario);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
      }

      const usuariosJSON = localStorage.getItem("users");
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const existe = usuarios.find((u) => u.email === email);
      if (existe) {
        setError("Este correo ya está registrado");
        setLoading(false);
        return;
      }

      const nuevoUsuario = { name, email, password, avatar: null };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("users", JSON.stringify(usuarios));

      const datosUsuario = { nombre: name, email };
      localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

      if (setDatos) setDatos(datosUsuario);
      if (setAvatar) setAvatar(null);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    }, 1500);
  };

  return (
    <>
      {loading && <PantallaCarga />}
      <main className="Form-loging">
        <Link className="Form-registro-logo" to="/">
          <img src="/logo.1.png" alt="Logo GAA" />
        </Link>
        <h2 className="Form-loging-title">Registrarse</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="Form-loging-input"
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            className="Form-loging-input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="form-redes">
            <p className="form-redes-title">Regístrate con</p>
            <div className="form-redes-icons">
              <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>📘</span>
              <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>🐦</span>
              <span style={{ color: '#bffcff', fontSize: '1.5rem' }}>📷</span>
            </div>
          </div>

          <button className="Form-loging-button" type="submit">
            Crear cuenta
          </button>

          <p className="Form-loging-registrar">
            ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
          </p>

          {error && <p style={{ color: "salmon", textAlign: "center" }}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default Registrarse;
