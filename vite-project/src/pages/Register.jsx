import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setInstitutionData, setRegisteredUser }) {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    cuit: '',
    fotoPerfil: null,
    fotoPreview: null,
    correo: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        fotoPerfil: file,
        fotoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fotoPerfil, fotoPreview, ...dataToSend } = form;

    const formData = new FormData();
    formData.append('nombre', dataToSend.nombre);
    formData.append('telefono', dataToSend.telefono);
    formData.append('cuit', dataToSend.cuit);
    formData.append('correo', dataToSend.correo);
    formData.append('password', dataToSend.password);
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('El registro falló.');
      }

      const result = await response.json();
      
      setInstitutionData(result.institutionData);
      setRegisteredUser(result.userData);
      navigate('/dashboard');

    } catch (error) {
      console.error('Error durante el registro:', error);
      // Aquí manejarías el error mostrando un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registro de Institución</h2>

      <label>
        Nombre completo de la institución:
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
      </label><br /><br />

      <label>
        Teléfono:
        <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required />
      </label><br /><br />

      <label>
        CUIT:
        <input type="text" name="cuit" value={form.cuit} onChange={handleChange} required />
      </label><br /><br />

      <label>
        Correo electrónico:
        <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
      </label><br /><br />

      <label>
        Contraseña:
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label><br /><br />

      <label>
        Foto de perfil:
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </label><br />

      {form.fotoPreview && (
        <img src={form.fotoPreview} alt="Foto de perfil" style={{ width: 150, marginTop: 10 }} />
      )}

      <button type="submit" style={{ marginTop: 20 }}>Registrar</button>
    </form>
  );
}

export default Register;
