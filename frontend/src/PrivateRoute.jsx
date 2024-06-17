/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children, roles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('userData'));
  const userRole = user ? user.rol : null;

  useEffect(() => {
    if (user && roles && !roles.includes(userRole)) {
      if (userRole === 'ADMINISTRADOR') {
        toast.error("Acceso denegado.Eres administrador.");
      } else {
        toast.error("No tienes los permisos necesarios para acceder a esta página.");
      }
    }
  }, [location.pathname, user, userRole, roles]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default PrivateRoute;
