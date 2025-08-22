import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setInstitutionData, setRegisteredUser }) {
  const [input, setInput] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Correo o contraseña incorrectos.');
      }

      const result = await response.json();

      setInstitutionData(result.institutionData);
      setRegisteredUser(result.userData);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Iniciar sesión</h2>

      <label>
        Correo:
        <input type="email" name="correo" value={input.correo} onChange={handleChange} required />
      </label><br /><br />

      <label>
        Contraseña:
        <input type="password" name="password" value={input.password} onChange={handleChange} required />
      </label><br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
  );
}

export default Login;