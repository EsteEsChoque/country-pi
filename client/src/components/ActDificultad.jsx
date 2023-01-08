import React from 'react';
const difficulties = [
    { value: "muyFacil", label: "Muy fácil" },
    { value: "facil", label: "Fácil" },
    { value: "normal", label: "Normal" },
    { value: "dificil", label: "Difícil" },
    { value: "experimentados", label: "Experimentados" },
    ];
// Componente de dificultad
const ActDificultad = ({ handleChange, formData }) => {
  return (
    <div className="dificultad">
      <label htmlFor="dificultad">Dificultad:</label><br/>
      {difficulties.map((difficulty) => (
          <div key={difficulty.value}>
            <input 
            type="radio" 
            id={`difficulty${difficulty.value}`} 
            name="difficulty" value={difficulty.value} 
            checked={formData.difficulty === difficulty.value} 
            onChange={handleChange}/>
            <label htmlFor={`difficulty${difficulty.value}`}>{difficulty.label}</label><br/>
        </div>
        ))}
    </div>
  );
};
export default ActDificultad;