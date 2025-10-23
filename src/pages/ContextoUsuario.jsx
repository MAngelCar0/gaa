import React, { createContext, useState, useEffect } from 'react';

export const ContextoUsuario = createContext();

export const ProveedorUsuario = ({ children }) => {
  const [datos, setDatos] = useState({});
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('datosUsuario');
    const avatarGuardado = localStorage.getItem('avatarUsuario');
    if (datosGuardados) setDatos(JSON.parse(datosGuardados));
    if (avatarGuardado) setAvatar(avatarGuardado);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key) return;
      if (e.key === 'datosUsuario') {
        try {
          const nuevo = JSON.parse(e.newValue || '{}');
          setDatos(nuevo);
        } catch (err) {
          console.error('Error parseando datosUsuario desde storage event', err);
        }
      }
      if (e.key === 'avatarUsuario') {
        setAvatar(e.newValue || null);
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <ContextoUsuario.Provider value={{ datos, setDatos, avatar, setAvatar }}>
      {children}
    </ContextoUsuario.Provider>
  );
};
