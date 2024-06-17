import  { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Bar.css";
import logoAdri from "./imagenes/logoadri.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

function Bar() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
  const headerImage = "https://www.colorhexa.com/0369fc.png";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData")); // Obtiene los datos del usuario almacenados en localStorage
    if (token) {
      setUsuarioAutenticado(true);
      if (userData && userData.rol) {
        setUserRole(userData.rol); // Establece el rol del usuario
      }
    }
  }, []);

  const handleLogout = () => {
    setShowConfirmationModal(true); 
  };

  const handleConfirmLogout = () => {
    // Elimina todos los datos del almacenamiento local
    localStorage.clear();

    // Elimina la caché del navegador
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });

    toast.success("¡Sesión cerrada con éxito!");
    setUsuarioAutenticado(false);

    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 1000);
  };

  const redireccionLogin = () => {
    navigate("/login");
  };

  const redireccionRegistro = () => {
    window.location.href = "/registro";
  };

  const handleMouseEnter = () => {
    setMostrarRegistro(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setMostrarRegistro(false);
    }, 2000);
  };

  return (
    <header>
      <Navbar
        fixed="top"
        color="light"
        light
        expand="xs"
        className="border-bottom border-gray"
        style={{
          height: 80,
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Row className="gx-0 position-relative w-100 align-items-center">
            <Col className="d-none d-lg-flex justify-content-start">
              <Nav className="mrx-auto" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    Inicio
                  </NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/post">
                    Post
                  </NavLink>
                </NavItem>

                <NavItem
                  className="d-flex align-items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink className="font-weight-bold" href="/calculadora">
                    Calculadora de Calorías
                  </NavLink>
                </NavItem>

                {mostrarRegistro && (
                  <NavItem className="d-flex align-items-center">
                    <NavLink
                      className="font-weight-bold"
                      href="/registroconsumo"
                    >
                      Registro de consumo
                    </NavLink>
                  </NavItem>
                )}

                {userRole === 'ADMINISTRADOR' && (
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/roles">
                      Gestión de Roles
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Col>

            <Col className="d-flex justify-content-between align-items-center">
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">
                  <img
                    src={logoAdri}
                    alt="avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: 220 }}
                  />
                </NavLink>
              </NavItem>

              <div>
                {usuarioAutenticado ? (
                  <Button
                    color="light"
                    size="sm"
                    className="btn-bold btn-outline-dark rounded-pill text-dark"
                    style={{ marginLeft: 10 }}
                    onClick={handleLogout}
                  >
                    Log-out
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    size="sm"
                    className="btn-bold btn-outline-dark rounded-pill"
                    style={{ marginLeft: 10 }}
                    onClick={redireccionLogin}
                  >
                    Log-in
                  </Button>
                )}

                {!usuarioAutenticado && (
                  <Button
                    color="warning"
                    size="sm"
                    className="btn-bold btn-outline dark rounded-pill"
                    style={{ marginLeft: 10 }}
                    onClick={redireccionRegistro}
                  >
                    Registrarse
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
      
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}

export default Bar;
