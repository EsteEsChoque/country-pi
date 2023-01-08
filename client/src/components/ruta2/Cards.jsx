import React from 'react';
import Card from './Card';
import style from "./Cards.module.css";


export default function Cards({paises}) {
  // acá va tu código
  // tip, podés usar un map
  console.log(paises); 
  
  return (<div className= {style.caja}> {
    paises.map(
      pais=> < Card 
      name = {pais[0].name.common} 
      capital = {pais[0].capital} 
      img = {pais[0].flags[1]}
      continente = {pais[0].continents}
      poblacion = {pais[0].population}
      id = {pais[0].idd.suffixes}
      key = {pais[0].idd.suffixes}
        />
      )}
    </div>  
  )
};