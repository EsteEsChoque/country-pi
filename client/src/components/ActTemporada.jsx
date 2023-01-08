import React, { useState, useEffect } from 'react';

const ActTemporada = ({ handleChange, formData }) => {

  return (
    <div >
        <label htmlFor="seasons">Temporadas:</label><br/>
        <input 
        type="checkbox" 
        id="seasonVerano" 
        name="seasons" 
        value="verano" 
        checked={formData.seasons.includes("verano")} 
        onChange={handleChange}/>
        <label htmlFor="seasonVerano">Verano</label><br/>

        <input 
        type="checkbox" 
        id="seasonInvierno" 
        name="seasons" 
        value="invierno" 
        checked={formData.seasons.includes("invierno")} 
        onChange={handleChange}/>
        <label htmlFor="seasonInvierno">Invierno</label><br/>

        <input 
        type="checkbox" 
        id="seasonPrimavera" 
        name="seasons" 
        value="primavera" 
        checked={formData.seasons.includes("primavera")} 
        onChange={handleChange}/>
        <label htmlFor="seasonPrimavera">Primavera</label><br/>

        <input 
        type="checkbox" 
        id="seasonOtoño" 
        name="seasons" 
        value="otoño" 
        checked={formData.seasons.includes("otoño")} 
        onChange={handleChange}/>
        <label htmlFor="seasonOtoño">Otoño</label><br/>
        </div>
        )}
export default ActTemporada;