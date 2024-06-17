/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

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
    width: '100px',
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
  selectCentered: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    backgroundColor: 'white',
    textAlign: 'center',  
    appearance: 'none',  
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
  buttonHover: {
    backgroundColor: '#45a049',
  }
};

const CreateFormPost = ({ reloadPosts, handleCancel }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: new Date().toISOString().split('T')[0], // Establece la fecha al momento actual
    categoria: "",
  });

  //console.log("CreateFormPost renderizado"); // Log para comprobar la renderización

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
  
    const formattedFormData = {
      ...formData,
      fecha: new Date(formData.fecha).toLocaleDateString('en-CA')
    };
  
    try {
      const response = await axios.post("https://spring.serverjpg.date/post/crear_post", formattedFormData);
      console.log("Post creado:", response.data);
      setFormData({
        titulo: "",
        descripcion: "",
        fecha: new Date().toISOString().split('T')[0],
        categoria: "",
      });
  
      reloadPosts();
      handleCancel();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error al crear el post: ${error.response.data}`);
      } else {
        console.error("Error al crear el post:", error);
        alert("Error al crear el post. Por favor, intenta de nuevo.");
      }
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <span className="close" onClick={handleCancel} style={{ cursor: 'pointer', float: 'right', fontSize: '24px' }}>×</span>
        <h2 style={styles.header}>Crear Post</h2>
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Titulo:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descripcion:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría:</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              style={styles.selectCentered}
            >
              <option value="">Seleccione una categoría</option>
              <option value="NUTRICION">Nutrición</option>
              <option value="SUPLEMENTOS">Suplementos</option>
              <option value="MINDFULNESS">Mindfulness</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required 
              style={styles.inputCentered}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Crear Post</button>
            <button type="button" onClick={handleCancel} style={styles.buttonCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFormPost;
