/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
  },
  postList: {
    listStyleType: 'none',
    padding: '0',
  },
  postItem: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  postButtons: {
    display: 'flex',
    gap: '10px',
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

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const ListaDePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/post/all');
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    obtenerPosts();
  }, []);

  const handleEditar = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/post/${id}`);
      const post = response.data;
      console.log('Editar post:', post);
    } catch (error) {
      console.error('Error al obtener el post:', error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/post/delete/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  const handleNuevoPost = async () => {
    try {
      console.log('Crear nuevo post');
    } catch (error) {
      console.error('Error al crear el nuevo post:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Lista de Posts</h1>
      <ul style={styles.postList}>
        {posts.map(post => (
          <li key={post.id} style={styles.postItem}>
            <span style={styles.postTitle}>{truncateText(post.titulo, 20)}</span>
            <div style={styles.postButtons}>
              <button style={styles.button} onClick={() => handleEditar(post.id)}>Editar</button>
              <button style={styles.buttonCancel} onClick={() => handleEliminar(post.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <button style={styles.button} onClick={handleNuevoPost}>Nuevo Post</button>
    </div>
  );
};

export default ListaDePosts;
