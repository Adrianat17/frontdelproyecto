import React, { useState } from 'react';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  },
  buttonCancel: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#f44336',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

const FormularioDePost = ({ onSubmit, datosIniciales }) => {
  const [formData, setFormData] = useState(datosIniciales);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label htmlFor="titulo" style={styles.label}>Título:</label>
      <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} style={styles.input} />

      <label htmlFor="contenido" style={styles.label}>Contenido:</label>
      <textarea id="contenido" name="contenido" value={formData.contenido} onChange={handleChange} rows={5} cols={50} style={styles.textarea} />

      <label htmlFor="categoria" style={styles.label}>Categoría:</label>
      <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} style={styles.input} />

      <div style={styles.buttonContainer}>
        <button type="submit" style={styles.button}>Enviar</button>
        <button type="submit" style={styles.button}>Actualizar post</button>
        <button type="submit" style={styles.buttonCancel}>Borrar</button>
      </div>
    </form>
  );
};

export default FormularioDePost;
