import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card ({name,id, capital,img,continente,poblacion }) {
    return <div className={style.caja}>
        
        <div>

        <NavLink to = {`/paises/${id}`}> 
            <h4 style={{ fontSize: "15px" }}> {name}</h4>
        </NavLink>
        <img src = {img} alt="icon" className= {style.imagen}/>
        <p style={{ fontSize: "13px" }}>Capital: {capital}</p>
        <p style={{ fontSize: "13px" }}>Continente: {continente}</p>
        <p style={{ fontSize: "13px" }}>Poblacion: {poblacion}</p>
        </div>
    </div>
}