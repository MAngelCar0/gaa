import React, { useEffect } from "react";
import "./PantallaCarga.css";

const PantallaCarga = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="loading-overlay">
      <div className="loading-logo">
      <img src="/logo.png" alt="" />
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default PantallaCarga;
