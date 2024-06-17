import React, { useEffect, useState } from "react";

const SeleccionAlimentos = ({
  comida,
  grupos,
  categorias,
  alimentos,
  handleGrupoChange,
  handleCategoriaChange,
  setSelectedAlimentoIndex,
  selectedAlimentoIndex,
  handleAlimentoSelect,
  selectedAlimentos,
  handleRemoveAlimento,
  selectedGrupo,
  selectedCategoria
}) => {
  const [filteredAlimentos, setFilteredAlimentos] = useState([]);

  useEffect(() => {
    const filtroAlimentos = alimentos.filter(alimento =>
      (!selectedGrupo || alimento.grupoAlimento === selectedGrupo) &&
      (!selectedCategoria || alimento.categoria === selectedCategoria)
    );
    setFilteredAlimentos(filtroAlimentos);
    console.log('Filtered Alimentos:', filtroAlimentos); // Log de los alimentos filtrados
  }, [selectedGrupo, selectedCategoria, alimentos]);

  return (
    <div className="calorias-container">
      <style>
        {`
          .calorias-container {
            margin: 40px auto;
            padding: 20px;
            max-width: 1800px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .chart-container {
            margin: 20px 0;
          }

          .chart-wrapper {
            position: relative;
            height: 400px;
          }

          .calorias-info h2,
          .calorias-info h3 {
            text-align: center;
          }

          .comida-section {
            margin-bottom: 40px;
          }

          .comida-title {
            text-align: center;
            font-size: 32px;
            margin-bottom: 10px;
          }

          button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            background-color: #0369fc;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #024bb5;
          }

          /* Estilo para eliminar los puntos negros de la lista */
          ul {
            list-style-type: none;
            padding: 0;
          }

          .select-container {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .alimentos-seleccionados {
            margin-top: 30px;
            max-width: 800px;
            margin: 0 auto;
          }

          .h3-alimentos-seleccionados {
            text-align: left;
          }

          .alimentos-seleccionados ul {
            padding: 0;
            margin: 0;
          }

          .alimentos-seleccionados li {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            text-align: left;
          }

          .alimentos-seleccionados span {
            flex: 1;
            margin-right: 10px;
            text-align: left;
          }

          .alimentos-seleccionados button {
            background-color: red;
            color: white;
            padding: 5px 10px;
            margin-left: 20px;
          }
        `}
      </style>

      <div className="select-wrapper" style={{ textAlign: "center", marginTop: "15px" }}>
        <div className="select-container">
          <select style={{ padding: "10px", fontSize: "16px" }} onChange={(e) => handleGrupoChange(e.target.value)}>
            <option value="">Seleccione un grupo</option>
            {grupos.map((grupo, index) => (
              <option key={index} value={grupo}>
                {grupo}
              </option>
            ))}
          </select>
          <select style={{ padding: "10px", fontSize: "16px" }} onChange={(e) => handleCategoriaChange(e.target.value)}>
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          <select style={{ padding: "10px", fontSize: "16px" }} value={selectedAlimentoIndex} onChange={(e) => setSelectedAlimentoIndex(e.target.value)}>
            <option value={-1}>Seleccione un alimento</option>
            {filteredAlimentos.map((alimento, index) => (
              <option key={index} value={index}>
                {alimento.alimento}
              </option>
            ))}
          </select>
          <button className="add-button" onClick={() => handleAlimentoSelect(comida)}>
            Agregar Alimento
          </button>
        </div>
      </div>

      <div className="alimentos-seleccionados">
        <h3 className="h3-alimentos-seleccionados">Alimentos seleccionados:</h3>
        <ul>
          {selectedAlimentos.map((alimento, index) => (
            <li key={index}>
              <span>{alimento.alimento} ({alimento.calorias} kcal)</span>
              <button onClick={() => handleRemoveAlimento(comida, index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeleccionAlimentos;
