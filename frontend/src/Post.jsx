/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import CreateFormPost from "./CreateFormPost";

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    marginTop: '120px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
  },
  header: {
    marginBottom: '20px',
    marginTop: '55px',
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
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '45px',
  },
  postInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: '16px',
    color: '#555',
  },
  postDate: {
    fontSize: '14px',
    color: '#888',
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

const Post = () => {
  const user = JSON.parse(localStorage.getItem('userData')); // Obtener el usuario de localStorage
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', fecha: '' });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8000/post/all")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8000/post/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
    setFormData({ titulo: post.titulo, descripcion: post.descripcion, fecha: post.fecha });
    setShowUpdateForm(true);
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleCreatePost = () => {
    setShowCreateForm(false);
    fetchPosts();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    setShowUpdateForm(false);
    fetchPosts();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Posts</h1>
      {user && user.rol === 'ADMINISTRADOR' && (
        <button onClick={handleCreateButtonClick} style={styles.button}>Crear Post</button>
      )}
      {showCreateForm && (
        <CreateFormPost
          handleCancel={handleCloseCreateForm}
          reloadPosts={handleCreatePost}
        />
      )}
      <ul style={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} style={styles.postItem}>
            <div style={styles.postInfo}>
              <Link to={`/post/${post.id}`} style={styles.postTitle}>
                {truncateText(post.titulo, 20)}
              </Link>
              <p style={styles.postDescription}>{truncateText(post.descripcion, 20)}</p>
              <p style={styles.postDate}>{post.fecha}</p>
            </div>
            {user && user.rol === 'ADMINISTRADOR' && (
              <div style={styles.postButtons}>
                <button style={styles.button} onClick={() => handleUpdate(post)}>Actualizar</button>
                <button style={styles.buttonCancel} onClick={() => handleDelete(post.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showUpdateForm && selectedPost && (
        <UpdateForm
          formData={formData}
          handleChange={handleFormChange}
          handleSubmit={handleFormSubmit}
          handleCancel={() => setShowUpdateForm(false)}
          postId={selectedPost.id}
        />
      )}
    </div>
  );
};

export default Post;
