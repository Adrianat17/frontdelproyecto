import{ useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import SeleccionAlimentos from "./SeleccionAlimentos";
import "./Calorias.css";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Calorias() {
  const [grupos, setGrupos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedAlimentoIndex, setSelectedAlimentoIndex] = useState(-1);
  const [selectedAlimentos, setSelectedAlimentos] = useState({
    Desayuno: [],
    Almuerzo: [],
    Comida: [],
    Merienda: [],
    Cena: []
  });
  const [totalCalorias, setTotalCalorias] = useState(0);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/alimento/grupos")
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching grupos:", error);
      });

    const caloriasObjetivoLocalStorage = localStorage.getItem("caloriasObjetivo");
    if (caloriasObjetivoLocalStorage) {
      setCaloriasObjetivo(parseInt(caloriasObjetivoLocalStorage));
    }
  }, []);

  useEffect(() => {
    const total = Object.values(selectedAlimentos).flatMap(arr => arr).reduce((acc, alimento) => {
      return acc + alimento.calorias;
    }, 0);
    setTotalCalorias(total);
  }, [selectedAlimentos]);

  const diferenciaCalorias = caloriasObjetivo - totalCalorias;
  let diferenciaColor = '';
  if (diferenciaCalorias > 150) {
    diferenciaColor = 'green';
  } else if (diferenciaCalorias <= 150 && diferenciaCalorias >= 5) {
    diferenciaColor = 'orange';
  } else {
    diferenciaColor = 'red';
  }

  const handleGrupoChange = (grupo) => {
    setSelectedGrupo(grupo);
    setSelectedCategoria("");
    setAlimentos([]);
    axios.get(`http://localhost:8000/alimento/categorias/${grupo}`)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categorías:", error);
      });
  };

  const handleCategoriaChange = (categoria) => {
    setSelectedCategoria(categoria);
    axios.get(`http://localhost:8000/alimento/alimentos?categoria=${categoria}&grupoAlimento=${selectedGrupo}`)
      .then((response) => {
        setAlimentos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alimentos:", error);
      });
  };

  const handleAlimentoSelect = (comida) => {
    if (selectedAlimentoIndex !== -1) {
      const selectedAlimento = alimentos[selectedAlimentoIndex];
      setSelectedAlimentos(prevState => {
        const updatedComida = [...prevState[comida]];
        if (!updatedComida.some(alimento => alimento.id === selectedAlimento.id)) {
          updatedComida.push(selectedAlimento);
        }
        return {
          ...prevState,
          [comida]: updatedComida
        };
      });
      setSelectedAlimentoIndex(-1);
    }
  };

  const handleRemoveAlimento = (comida, alimentoIndex) => {
    const updatedSelectedAlimentos = selectedAlimentos[comida].filter((_, index) => index !== alimentoIndex);
    setSelectedAlimentos(prevState => ({
      ...prevState,
      [comida]: updatedSelectedAlimentos
    }));
  };

  const verificarRegistroExistente = async (fechaFormateada, userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/registro/existe_registro?fecha=${fechaFormateada}&userId=${userId}`);
      return response.data.existeRegistro;
    } catch (error) {
      console.error('Error verificando el registro:', error);
      return false;
    }
  };

  const handleAddComida = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const año = fechaActual.getFullYear();
      const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
      localStorage.setItem('fechaFormateada', fechaFormateada);

      const existeRegistro = await verificarRegistroExistente(fechaFormateada, userId);

      if (existeRegistro) {
        toast.error(`Ya existe un registro para la fecha ${fechaFormateada}`);
        setLoading(false);
        return;
      }

      const data = {
        cantidadIngerida: caloriasObjetivo,
        cantidad: totalCalorias,
        fechaRegistro: fechaFormateada,
        usuario: {
          id: parseInt(userId),
        },
      };

      const response = await axios.post('http://localhost:8000/registro/crear_registro', data);

      if (response.status === 200) {
        toast.success(`Calorías consumidas: ${totalCalorias} kcal`);
        setTimeout(() => {
          setLoading(false);
          window.location.href = '/registroconsumo';
        }, 3000);
      } else {
        console.error('Error al crear el registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setLoading(false);
    }
  };

  return (
    <div className="calorias-container">
      <h1 style={{ marginTop: "55px", textAlign: 'center' }}>Registro de Comidas</h1>
      <div style={{ marginBottom: "25px", marginTop: "20px", padding: "10px", maxWidth: "1400px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <p>
          Aquí podrás registrar las comidas que ingieras durante el día y así calcular las calorías que has consumido y las que aún te quedan por consumir. Es importante recordar que las calorías de los alimentos están calculadas por cada 100g, por lo que, para un correcto funcionamiento, deberás registrar un mismo alimento varias veces en base a la cantidad ingerida.
        </p>
        <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }} className="calorias-info">
          <h2 style={{ margin: 0 }}>Objetivo de calorías: {caloriasObjetivo} kcal</h2>
          <h3 style={{ margin: 0, color: diferenciaColor }}>
            Diferencia del objetivo: {diferenciaCalorias} kcal
          </h3>
        </div>
      </div>
      <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        <div className="chart-wrapper" style={{ width: '80%', maxWidth: '800px' }}>
          <Bar
            data={{
              labels: ["Total de calorías", "Calorías objetivo"],
              datasets: [{
                label: "Calorías",
                backgroundColor: [diferenciaCalorias < 0 ? "#FF6384" : "#36A2EB", "#36A2EB"],
                data: [totalCalorias, caloriasObjetivo]
              }]
            }}
            options={{
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>
      </div>

      {['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'].map(comida => (
        <div key={comida} className="comida-section">
          <h2 className="comida-title">{comida}</h2>
          <SeleccionAlimentos
            comida={comida}
            grupos={grupos}
            categorias={categorias}
            alimentos={alimentos}
            handleGrupoChange={handleGrupoChange}
            handleCategoriaChange={handleCategoriaChange}
            setSelectedAlimentoIndex={setSelectedAlimentoIndex}
            selectedAlimentoIndex={selectedAlimentoIndex}
            handleAlimentoSelect={handleAlimentoSelect}
            selectedAlimentos={selectedAlimentos[comida]}
            handleRemoveAlimento={(index) => handleRemoveAlimento(comida, index)}
          />
        </div>
      ))}

      {loading ? (
        <div>
          <CircularProgress color="success" />
        </div>
      ) : (
        <button onClick={handleAddComida}>Registrar comida(s)</button>
      )}
      <ToastContainer />
    </div>
  );
}

export default Calorias;
