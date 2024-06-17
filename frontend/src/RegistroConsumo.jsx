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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 

    axios.get('https://spring.serverjpg.date/registro/all')
      .then(response => {
        const registros = response.data;
        
        const userRegistros = registros.filter(registro => registro.usuario.id === parseInt(userId, 10));

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
              tension: 0.1,
              pointRadius: 5, // tamaño de los puntos
              pointHoverRadius: 7 // tamaño de los puntos al pasar el raton
            },
            {
              label: 'Calorías Consumidas',
              data: consumidas,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
              pointRadius: 5, 
              pointHoverRadius: 7 
            }
          ]
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginTop: "55px", textAlign: "center" }}>
      <h1 style={{ marginTop: "95px" }}>Registros de Consumo</h1>
      <p>
        En esta página tendrás un registro tanto corporal como alimentario. Podrás medir tu progreso con gran facilidad.
      </p>
      <div style={{ marginBottom: "25px", display: "flex", justifyContent: "center" }}>
        {chartData.labels.length > 0 ? (
          <div style={{ width: "80%" }}>
            <Line 
              data={chartData} 
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.raw + ' kcal';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default RegistroConsumo;
