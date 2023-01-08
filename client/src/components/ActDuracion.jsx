import React from 'react';


const options = [];
for (let i = 0; i <= 6; i++) {
options.push(<option key={`${i}:00`} value={`${i}:00`}>{`${i}:00hs`}</option>);
options.push(<option key={`${i}:30`} value={`${i}:30`}>{`${i}:30hs`}</option>);
}
// Componente de dificultad
const ActDuracion = ({ handleChange, formData }) => {
  return (
    <div >
      <label htmlFor="duration">Duración:</label><br/>
        <select 
        id="duration" 
        name="duration" 
        value={formData.duration} 
        onChange={handleChange}>
        {options}
        </select><br/>
    </div>
  )
};
export default ActDuracion;