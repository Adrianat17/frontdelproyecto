/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PerfilUsuario({ userId }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/usuario/${userId}`);
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>User Profile</h2>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Otros datos del usuario */}
        </div>
      )}
    </div>
  );
}

export default PerfilUsuario;
