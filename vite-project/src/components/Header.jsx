import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        {/* Contenedor izquierda: logo + botones */}
        <div style={leftContainerStyle}>
          <img
            src="/logo4.png"
            alt="Logo de la institución"
            style={logoStyle}
          />
          <div style={leftButtonsStyle}>
            <Link to="/" style={buttonStyle}>Home</Link>
            <Link to="/dashboard" style={buttonStyle}>Dashboard</Link>
            <Link to="/about" style={buttonStyle}>About</Link>
          </div>
        </div>

        {/* Contenedor derecha: botones de sesión */}
        <div style={rightButtonsStyle}>
          <Link to="/login" style={buttonStyle}>Inicio de sesión</Link>
          <Link to="/register" style={buttonStyle}>Register</Link>
        </div>
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
  alignItems: 'center',
  justifyContent: 'space-between', // Extremos opuestos
  width: '100%',
};

const leftContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px', // espacio entre logo y botones izquierdos
};

const logoStyle = {
  height: '120px',
  objectFit: 'contain',
};

const leftButtonsStyle = {
  display: 'flex',
  gap: '15px',
};

const rightButtonsStyle = {
  display: 'flex',
  gap: '15px',
  marginLeft: 'auto', // empuja los botones a la derecha
  paddingright: '50px', // espacio a la derecha
};

const buttonStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#61dafb',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Header;