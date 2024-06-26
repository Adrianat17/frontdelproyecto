import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import atleta from './imagenes/atleta.jpg';
import muy from './imagenes/muy.jpg';
import moderada from './imagenes/moderada.jpg';
import ligactivo from './imagenes/ligactivo.jpg';
import sedentario from './imagenes/sedentario.jpg';
import alturaImg from './imagenes/altura.jpg';
import peso from './imagenes/peso.jpg';
import edadF from './imagenes/edad.jpg';
import generoF from './imagenes/genero.jpg';

function Calculadora() {
  const [nuevoPeso, setNuevoPeso] = useState('');
  const [nuevaAltura, setNuevaAltura] = useState('');
  const [actividad, setActividad] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('userData'));
    if (usuario) {
      setEdad(usuario.edad ? usuario.edad.toString() : '');
      setGenero(usuario.genero === 'F' ? 'Femenino' : 'Masculino');
      setNuevaAltura(usuario.altura ? usuario.altura.toString() : '');
      setNuevoPeso(usuario.peso ? usuario.peso.toString() : '');
    }
  }, []);

  const handlePesoButtonClick = async () => {
    const pesoParsed = parseFloat(nuevoPeso);
    if (isNaN(pesoParsed) || pesoParsed < 15) {
      toast.error('El peso debe ser un número válido y mayor o igual a 15 kg. Por favor, ingrese un peso válido.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`https://spring.serverjpg.date/usuario/update/${userId}`, {
        peso: pesoParsed,
      });

      toast.success('Peso actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el peso:', error);
      toast.error('Error al actualizar el peso. Por favor, inténtelo de nuevo.');
    }
  };

  const handleAlturaButtonClick = async () => {
    const alturaParsed = parseFloat(nuevaAltura);
    if (isNaN(alturaParsed) || alturaParsed < 70) {
      toast.error('La altura debe ser un número válido y mayor o igual a 70 cm. Por favor, ingrese una altura válida.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`https://spring.serverjpg.date/usuario/update/${userId}`, {
        altura: alturaParsed,
      });

      toast.success('Altura actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la altura:', error);
      toast.error('Error al actualizar la altura. Por favor, inténtelo de nuevo.');
    }
  };

  const handleActividadChange = (e) => {
    setActividad(e.target.value);
  };

  const handleCalcular = async () => {
    const userId = localStorage.getItem('userId');
    const lastCalculationDate = localStorage.getItem(`lastCalculationDate_${userId}`);
    const today = new Date().toISOString().split('T')[0];

    if (lastCalculationDate === today) {
      toast.error('Ya has calculado las calorías para hoy. Por favor, inténtelo de nuevo mañana.');
      return;
    }

    const pesoParsed = parseFloat(nuevoPeso);
    const alturaParsed = parseFloat(nuevaAltura);
    const edadParsed = parseInt(edad, 10);
    const actividadParsed = parseFloat(actividad);

    if (isNaN(pesoParsed) || isNaN(alturaParsed) || isNaN(edadParsed) || isNaN(actividadParsed)) {
      toast.error('Todos los campos deben contener valores numéricos válidos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`https://spring.serverjpg.date/calculadora/calcular/${userId}`, null, {
        params: {
          genero: genero,
          edad: edadParsed,
          peso: pesoParsed,
          altura: alturaParsed,
          actividad: actividadParsed,
        },
      });
      const caloriasCalculadas = response.data;

      localStorage.setItem('caloriasObjetivo', caloriasCalculadas);
      localStorage.setItem(`lastCalculationDate_${userId}`, today);

      toast.success(`Calorías calculadas: ${caloriasCalculadas}`);

      setTimeout(() => {
        setLoading(false);
        navigate('/calculadora/calorias');
      }, 4000);
    } catch (error) {
      console.error('Error al calcular las calorías:', error);
      if (error.response) {
        console.error('Data:', error.response.data);
      }
      toast.error('Error al calcular las calorías. Por favor, inténtelo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: "95px" }}>
        <h1>Cálculo de la tasa de metabolismo basal</h1>
      </div>
      <div style={{ marginBottom: "25px", marginTop: "20px", padding: "10px", maxWidth: "1400px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <p>
          El cálculo de la tasa de metabolismo basal (TMB) es una estimación de la
          cantidad de energía que tu cuerpo necesita para realizar sus funciones
          básicas en reposo. Esta medida puede ayudarte a entender mejor tus
          necesidades calóricas diarias. Para ello, la fórmula de Harris Benedict
          descrita en 1919, revisada por Mifflin y St Jeor en 1990 toma parámetros
          como la altura, edad, género, sexo y peso. Así como tu actividad diaria
          de ejercicio.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <Card sx={{ width: 300, height: 350, margin: "10px", textAlign: "center" }}>
          <CardMedia sx={{ height: 140 }} image={generoF} title="Género" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Género
            </Typography>
            <Typography variant="body2" color="text.secondary" marginTop="48px" fontSize="25px">
              <strong>{genero}</strong>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 300, height: 350, margin: "10px", textAlign: "center" }}>
          <CardMedia sx={{ height: 140 }} image={edadF} title="Edad" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Edad
            </Typography>
            <Typography variant="body2" color="text.secondary" marginTop="48px" fontSize="25px">
              <strong>{edad} años</strong>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 300, height: 350, margin: "10px", textAlign: "center", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CardMedia sx={{ height: 140, borderRadius: '5px 5px 0 0', objectFit: 'cover' }} image={peso} title="Peso" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Peso
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Introduce tu peso en kilogramos.
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <input
                type="number"
                min="0"
                value={nuevoPeso}
                onChange={(e) => setNuevoPeso(e.target.value)}
                style={{
                  textAlign: 'center',
                  width: '60px',
                  height: '40px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #0369FC',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                }}
              />
              <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>
                kg
              </Typography>
            </div>
            <CardActions style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Button
                size="small"
                onClick={handlePesoButtonClick}
                sx={{
                  backgroundColor: '#0369FC',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '5px',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#0451a5',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Añadir Peso
              </Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card sx={{ width: 300, height: 350, margin: "10px", textAlign: "center", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CardMedia sx={{ height: 140, borderRadius: '5px 5px 0 0', objectFit: 'cover' }} image={alturaImg} title="Altura" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Altura
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Introduce tu altura en centímetros.
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <input
                type="number"
                min="0"
                value={nuevaAltura}
                onChange={(e) => setNuevaAltura(e.target.value)}
                style={{
                  textAlign: 'center',
                  width: '60px',
                  height: '40px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #0369FC',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                }}
              />
              <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>
                cm
              </Typography>
            </div>
            <CardActions style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Button
                size="small"
                onClick={handleAlturaButtonClick}
                sx={{
                  backgroundColor: '#0369FC',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '5px',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#0451a5',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Añadir Altura
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      <div style={{ marginBottom: "35px", marginTop: "25px", textAlign: "center" }}>
        <h2>Actividad diaria</h2>
        <div style={{ marginBottom: "25px", marginTop: "20px", padding: "20px", maxWidth: "1400px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <p>
            El nivel de actividad física se clasifica en cinco categorías: <strong>Sedentario</strong>,{' '}
            <strong>ligeramente activo</strong>, <strong>moderadamente activo</strong>, <strong>muy activo</strong> o{' '}
            <strong>atleta</strong>, y se multiplica por un factor específico para ajustar el gasto energético basal{' '}
            <strong>(GEB)</strong> y estimar las necesidades calóricas totales.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Card sx={{ width: 280, height: 350, margin: '10px' }}>
          <CardMedia sx={{ height: 140 }} image={sedentario} title="Sedentario" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sedentario
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Poco o nada de ejercicio durante la semana.
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <input type="radio" id="sedentario" name="actividad" value="1.2" onChange={handleActividadChange} />
              <label htmlFor="sedentario">Sedentario</label>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ width: 280, height: 350, margin: '10px' }}>
          <CardMedia sx={{ height: 140 }} image={ligactivo} title="Ligeramente activo" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Ligeramente activo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ejercicio ligero o deporte 1-3 días a la semana.
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <input type="radio" id="ligero" name="actividad" value="1.375" onChange={handleActividadChange} />
              <label htmlFor="ligero">Ligeramente activo</label>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ width: 280, height: 350, margin: '10px' }}>
          <CardMedia sx={{ height: 140 }} image={moderada} title="Moderadamente activo" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Moderadamente activo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ejercicio moderado o deporte 3-5 días a la semana.
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <input type="radio" id="moderado" name="actividad" value="1.55" onChange={handleActividadChange} />
              <label htmlFor="moderado">Moderadamente activo</label>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ width: 280, height: 350, margin: '10px' }}>
          <CardMedia sx={{ height: 140 }} image={muy} title="Muy activo" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muy activo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ejercicio intenso o deporte 6-7 días a la semana.
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <input type="radio" id="intenso" name="actividad" value="1.725" onChange={handleActividadChange} />
              <label htmlFor="intenso">Muy activo</label>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ width: 280, height: 350, margin: '10px' }}>
          <CardMedia sx={{ height: 140 }} image={atleta} title="Atleta" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Atleta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ejercicio intenso muy intenso o deporte 7 días a la semana.
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <input type="radio" id="atleta" name="actividad" value="1.9" onChange={handleActividadChange} />
              <label htmlFor="atleta">Atleta</label>
            </div>
          </CardContent>
        </Card>
      </div>
      {loading ? (
        <CircularProgress color="success" />
      ) : (
        <Button
          onClick={handleCalcular}
          sx={{
            backgroundColor: '#0369FC',
            color: 'white',
            fontWeight: 'bold',
            marginTop: '20px',
            padding: '12px 24px',
            border: '1px solid black',
            borderRadius: '8px',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: '#0451a5',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Calcular Calorías
        </Button>
      )}
      <ToastContainer />
    </div>
  );
}

export default Calculadora;
