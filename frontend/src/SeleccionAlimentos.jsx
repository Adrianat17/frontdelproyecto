/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const SeleccionAlimentos = ({ comida, grupos, categorias, alimentos, handleGrupoChange, handleCategoriaChange, setSelectedAlimentoIndex, selectedAlimentoIndex, handleAlimentoSelect, selectedAlimentos, handleRemoveAlimento }) => {
  return (
    <div style={{ marginTop: "25px" }}>
      <h2>{comida}</h2>
      <div className="select-container">
        <select onChange={(e) => handleGrupoChange(e.target.value)}>
          <option value="">Seleccione un grupo</option>
          {grupos.map((grupo, index) => (
            <option key={index} value={grupo}>
              {grupo}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleCategoriaChange(e.target.value)}>
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <select value={selectedAlimentoIndex} onChange={(e) => setSelectedAlimentoIndex(e.target.value)}>
          <option value={-1}>Seleccione un alimento</option>
          {alimentos.map((alimento, index) => (
            <option key={index} value={index}>
              {alimento.alimento}
            </option>
          ))}
        </select>
        <button className="add-button" onClick={handleAlimentoSelect}>Agregar Alimento</button>
      </div>

      <div className="alimentos-seleccionados">
        <h3 className="h3-alimentos-seleccionados">Alimentos seleccionados:</h3>
        <ul>
          {selectedAlimentos.map((alimento, index) => (
            <li key={index}>
              {alimento.alimento} ({alimento.calorias} kcal)
              <button onClick={() => handleRemoveAlimento(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeleccionAlimentos;
