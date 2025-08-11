import { useNavigate } from 'react-router-dom';

function Dashboard({ institutionData, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!institutionData) {
    return <p>No hay datos de la institución registrados.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', position: 'relative' }}>
      <h2>Dashboard Institución</h2>
      <p><strong>Nombre:</strong> {institutionData.nombre}</p>
      <p><strong>Teléfono:</strong> {institutionData.telefono}</p>
      <p><strong>CUIT:</strong> {institutionData.cuit}</p>
      {institutionData.fotoPreview && (
        <img
          src={institutionData.fotoPreview}
          alt="Foto de perfil"
          style={{ width: 200, marginTop: 10 }}
        />
      )}

      {/* Botón fijo abajo a la izquierda */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '10px 15px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;