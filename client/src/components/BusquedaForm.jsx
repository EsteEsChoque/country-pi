import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paisFilter } from "../redux/actions";
import style from "./SegundoBuscador.module.css";
import { paisesSeleccionados1 } from "../redux/actions";

const BusquedaForm = ({ onCountryIdsChange,paisesSeleccionados,setPaisesSeleccionados }) => {
  const todopais = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(paisFilter(search));
  }, [search]);
  const searcher = (e) => {
    if (e.target.value) {
      setSearch(e.target.value);
    }
  }

  

  const paisesMostrados = todopais.pais.slice(0, 7);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = ( pais) => {
    if (!paisesSeleccionados.includes(pais.id)) {
    setPaisesSeleccionados([...paisesSeleccionados, pais.id]);
    onCountryIdsChange([...paisesSeleccionados, pais.id]);
    } else {
    setPaisesSeleccionados([...paisesSeleccionados]);
    onCountryIdsChange([...paisesSeleccionados]);
    }
    };
    
    const handleRemove = (id) => {
    setPaisesSeleccionados(paisesSeleccionados.filter((p) => p !== id));
    onCountryIdsChange(paisesSeleccionados.filter((p) => p !== id));
    };
    
    return (
    <div>
    
    <div className={style.divForm}>
    <label htmlFor="searchActivi" className={style.label}>
    Buscar
    </label>
    <br />
    <input
           type="text"
           id="searchActivi"
           value={search}
           onChange={handleChange}
           placeholder="¿En qué paises?"
           className={style.input}
         />
             <div className={style.conteinerDiv}>
      <ul className={style.ul1}>
        {paisesMostrados.map((pais) => (
          <li key={pais.name} className={style.conteiner}>
            {pais.name}
            <img
              className={style.img}
              src={pais.img}
              alt={pais.name}
            />
            <button
              type="button"
              onClick={() => handleAdd(pais)}
              className={style.button}
            >
              ✓
            </button>
          </li>
        ))}
      </ul>
      <ul className={style.ul2}>
        {paisesSeleccionados.map((id) => {
        // Obtiene la información del país con el ID especificado
          const pais = todopais.paises.find((p) => p.id === id);
            return (
              <li key={pais.name} className={style.conteiner}>
              {pais.name}
                <img
                 className={style.img}
                 src={pais.img}
                 alt={pais.name}
               />
              <button
              type="button"
              onClick={() => handleRemove(id)}
              className={style.button}>X</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);
};

export default BusquedaForm;

