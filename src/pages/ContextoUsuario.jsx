import React, { createContext, useState, useEffect } from 'react';

export const ContextoUsuario = createContext();

export const ProveedorUsuario = ({ children }) => {
  const [datos, setDatos] = useState(() => {
    try {
      const guardados = localStorage.getItem('datosUsuario');
      return guardados ? JSON.parse(guardados) : {};
    } catch (err) {
      console.error('Error al cargar datosUsuario:', err);
      return {};
    }
  });

  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem('avatarUsuario') || null;
  });

  // 🔹 Guarda automáticamente los datos cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem('datosUsuario', JSON.stringify(datos));
    } catch (err) {
      console.error('Error guardando datosUsuario:', err);
    }
  }, [datos]);

  // 🔹 Guarda o elimina el avatar según corresponda
  useEffect(() => {
    if (avatar) {
      localStorage.setItem('avatarUsuario', avatar);
    } else {
      localStorage.removeItem('avatarUsuario');
    }
  }, [avatar]);

  // 🔹 Escucha cambios desde otras pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'datosUsuario') {
        try {
          const nuevo = JSON.parse(e.newValue || '{}');
          setDatos(nuevo);
        } catch (err) {
          console.error('Error parseando datosUsuario desde storage event', err);
        }
      } else if (e.key === 'avatarUsuario') {
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
