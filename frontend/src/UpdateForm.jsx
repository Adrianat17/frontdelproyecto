/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    maxWidth: '500px',
    width: '90%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
    textAlign: 'center', // Centrar el texto del label
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    flex: 1,
  },
  inputCentered: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    textAlign: 'center',
    flex: 1,
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    flex: 1,
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

const UpdateForm = ({ formData, handleChange, handleSubmit, handleCancel, postId }) => {
  if (!formData) {
    return null; // O mostrar un loader o mensaje de error
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (formData.fecha > today) {
      toast.error("La fecha no puede ser superior a la fecha de hoy.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8000/post/${postId}`, formData);
      console.log("Post actualizado:", response.data);
      handleSubmit(); // Llama a handleSubmit sin pasar el evento ficticio
      toast.success("Post actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      toast.error("Hubo un error al actualizar el post.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <span className="close" onClick={handleCancel} style={{ cursor: 'pointer', float: 'right', fontSize: '24px' }}>×</span>
        <h2 style={styles.header}>Actualizar Post</h2>
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Titulo actualizado:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descripcion:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha actualizada:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              style={styles.inputCentered}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Actualizar Post</button>
            <button type="button" onClick={handleCancel} style={styles.buttonCancel}>Cancelar</button>
          </div>
        </form>
        <ToastContainer style={{ marginTop: '60px' }} />
      </div>
    </div>
  );
};

export default UpdateForm;
