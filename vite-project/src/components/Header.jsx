import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <img
          src="/logo4.png"
          alt="Logo de la institución"
          style={logoStyle}
        />
        <Link to="/" style={buttonStyle}>Home</Link>
        <Link to="/dashboard" style={buttonStyle}>Dashboard</Link>
        <Link to="/login" style={buttonStyle}>Inicio de sesión</Link>
        <Link to="/about" style={buttonStyle}>About</Link>
        <Link to="/register" style={buttonStyle}>Register</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  width: '100%',
  backgroundColor: '#282c34',
  padding: '10px 20px',
  boxSizing: 'border-box',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center', // Alinea logo y botones verticalmente
  gap: '15px',
};

const logoStyle = {
  height: '120px', // Aumenta tamaño
  objectFit: 'contain',
};

const buttonStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#61dafb',
  fontWeight: 'bold',
  textAlign: 'center', // Centra texto
  display: 'flex', // Para centrar verticalmente
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px', // Altura uniforme
};

export default Header;