import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Bar from './Bar';
import Post from './Post';
import Calculadora from './Calculadora';
import Principal from './Principal';
import Login from './Login';
import Registro from './Registro';
import DetallesPost from './DetallesPost';
import CreateFormPost from './CreateFormPost';
import Calorias from './Calorias';
import RegistroConsumo from './RegistroConsumo';
import PrivateRoute from './PrivateRoute';
import './Bar.css';
import Cursor from './Cursor';
import './Cursor.css';
import { ToastContainer } from 'react-toastify';
import Roles from './Roles';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('userData');

  return (
    <div className="App">
      <Router>
        <Bar />
        <Cursor />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/post"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['ADMINISTRADOR', 'USUARIO']}>
                  <Post />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/post/create"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['USUARIO']}>
                  <CreateFormPost />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/post/:id"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['ADMINISTRADOR', 'USUARIO']}>
                  <DetallesPost />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/calculadora"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['USUARIO']}>
                  <Calculadora />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/calculadora/calorias"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['USUARIO']}>
                  <Calorias />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/registroconsumo"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['USUARIO']}>
                  <RegistroConsumo />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/roles"
            element={
              isAuthenticated ? (
                <PrivateRoute roles={['ADMINISTRADOR']}>
                  <Roles /> {/* Usar el componente Roles en lugar de Calorias */}
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
