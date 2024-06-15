/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmacion, setEmailConfirmacion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [contrasenaConfirmacion, setContrasenaConfirmacion] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [contrasenaError, setContrasenaError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !fechaNacimiento || !genero || !email || !emailConfirmacion || !contrasena || !contrasenaConfirmacion) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (contrasena !== contrasenaConfirmacion) {
      setContrasenaError(true);
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (email !== emailConfirmacion) {
      setEmailError(true);
      setError('Los correos electrónicos no coinciden.');
      return;
    }

    setError('');
    setContrasenaError(false);
    setEmailError(false);

    const formattedFechaNacimiento = new Date(fechaNacimiento).toISOString().slice(0, 10);

    const usuario = {
      nombre,
      fechaNacimiento: formattedFechaNacimiento,
      genero,
      email,
      contrasena
    };

    axios.post('http://localhost:8000/usuario/registro', usuario)
      .then(response => {
        console.log(response.data);
        const { nombre, fechaNacimiento, genero, email, rol } = response.data;
        const usuarioConRol = { nombre, fechaNacimiento, genero, email, rol };
        localStorage.setItem('usuario', JSON.stringify(usuarioConRol));
        navigate('/login');
      })
      .catch(error => {
        console.error('Error al crear el usuario', error);
        setError('Hubo un problema al crear el usuario. Inténtalo de nuevo.');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Registro de Usuario</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Fecha de Nacimiento:</label>
            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} style={{ ...styles.input, textAlign: 'center' }} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Género:</label>
            <label style={styles.radioLabel}>
              <input type="radio" value="M" checked={genero === 'M'} onChange={(e) => setGenero(e.target.value)} />
              Masculino
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" value="F" checked={genero === 'F'} onChange={(e) => setGenero(e.target.value)} />
              Femenino
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@email.com" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Email:</label>
            <input type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} style={{ ...styles.input, border: emailError ? '2px solid red' : '1px solid #ccc' }} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? "text" : "password"} value={contrasenaConfirmacion} onChange={(e) => setContrasenaConfirmacion(e.target.value)} style={{ ...styles.input, border: contrasenaError ? '2px solid red' : '1px solid #ccc' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>Registrarse</button>
        </form>
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
  radioLabel: {
    marginRight: '15px',
    marginLeft: '5px',
  },
  input: {
    textAlign:'center',
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
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
  showPasswordButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#0369fc',
    fontWeight: 'bold',
  },
};

export default Registro;
