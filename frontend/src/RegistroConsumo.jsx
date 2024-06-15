/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RegistroConsumo() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID

    axios.get('http://localhost:8000/registro/all')
      .then(response => {
        const registros = response.data;
        // Filter registros based on the logged-in user's ID
        const userRegistros = registros.filter(registro => registro.usuario.id === parseInt(userId));

        const fechas = userRegistros.map(registro => registro.fechaRegistro);
        const objetivos = userRegistros.map(registro => registro.cantidadIngerida);
        const consumidas = userRegistros.map(registro => registro.cantidad);

        setChartData({
          labels: fechas,
          datasets: [
            {
              label: 'Calorías Objetivo',
              data: objetivos,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Calorías Consumidas',
              data: consumidas,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ marginTop: "55px" }}>
      <h1 style={{ marginBottom: "25px" }}>Registros de Consumo</h1>
      <p>
        En esta página tendrás un registro tanto corporal como alimentario. Podrás medir tu progreso con gran facilidad.
      </p>
      <div style={{ marginBottom: "25px" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default RegistroConsumo;
