/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuario/all');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      toast.error('Error al cargar los usuarios');
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/usuario/delete/${id}`);
      toast.success('Usuario eliminado correctamente');
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      toast.error('Error al eliminar el usuario');
    }
  };

  const cambiarRol = async (id) => {
    const adminId = JSON.parse(localStorage.getItem('userData')).id;
    try {
      await axios.put(`http://localhost:8000/usuario/asignar/${id}`, null, {
        params: {
          rol: newRole,
          adminId: adminId,
        },
      });
      toast.success('Rol asignado correctamente');
      fetchUsuarios();
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
      toast.error('Error al cambiar el rol del usuario');
    }
  };

  return (
    <div style={styles.rolesContainer}>
      <h1 style={styles.header}>Gestión de Roles</h1>
      <ul style={styles.usuariosList}>
        {usuarios.map((usuario) => (
          <li key={usuario.id} style={styles.usuarioItem}>
            <span style={styles.usuarioInfo}>
              {usuario.nombre} - {usuario.email} - {usuario.rol}
            </span>
            <div style={styles.usuarioActions}>
              <button style={styles.btnDanger} onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              <button style={styles.btnPrimary} onClick={() => setSelectedUser(usuario.id)}>Cambiar Rol</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div style={styles.cambiarRol}>
          <h2 style={styles.subHeader}>Cambiar Rol</h2>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={styles.formSelect}>
            <option value="">Seleccione un rol</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="USUARIO">Usuario</option>
          </select>
          <button style={styles.btnSuccess} onClick={() => cambiarRol(selectedUser)}>Guardar</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  rolesContainer: {
    marginTop:'45px',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#0369fc',
    marginBottom: '20px',
  },
  usuariosList: {
    listStyleType: 'none',
    padding: '0',
  },
  usuarioItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  usuarioInfo: {
    flexGrow: '1',
  },
  usuarioActions: {
    display: 'flex',
    gap: '10px',
  },
  btnDanger: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  btnPrimary: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  cambiarRol: {
    marginTop: '20px',
    textAlign: 'center',
  },
  subHeader: {
    marginBottom: '10px',
    color: '#0369fc',
  },
  formSelect: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  btnSuccess: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Roles;
