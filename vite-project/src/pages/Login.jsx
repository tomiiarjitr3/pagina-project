import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ registeredUser }) {
  const [input, setInput] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      registeredUser &&
      input.correo === registeredUser.correo &&
      input.password === registeredUser.password
    ) {
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
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

      <button type="submit" style={{ marginTop: 0 }}>Ingresar</button>
    </form>
  );
}

export default Login;