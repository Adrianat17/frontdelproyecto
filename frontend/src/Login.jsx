import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://spring.serverjpg.date/usuario/login', {
        email: email,
        contrasena: password  
      });

      const data = response.data;
      const token = data.token;
      localStorage.setItem('token', token);

      const userId = data.id;
      const userRol = data.rol;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRol', userRol);

      const userResponse = await axios.get(`https://spring.serverjpg.date/usuario/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = userResponse.data;
      localStorage.setItem('userData', JSON.stringify(userData));

      toast.success("Inicio de sesión exitoso");

      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error.response) {
        console.error('Respuesta del servidor:', error.response);
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        setError(`Hubo un problema al iniciar sesión: ${error.response.data.message || error.response.status}`);
      } else if (error.request) {
        console.error('Solicitud realizada pero sin respuesta:', error.request);
        setError('No se recibió respuesta del servidor. Verifique su conexión.');
      } else {
        console.error('Error en la configuración de la solicitud:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Iniciar Sesión</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <ToastContainer />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0369fc, #000000, #ffffff)',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    margin: 0,
    padding: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
  loginBox: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
  },
  title: {
    margin: '0 0 20px',
    color: '#0369fc',
    fontSize: '2em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  form: {
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#333',
  },
  input: {
    display: 'block',
    width: '100%',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    transition: 'border-color 0.3s',
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#0369fc',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  error: {
    marginTop: '15px',
    color: 'red',
    textAlign: 'center',
  },
};

export default Login;
