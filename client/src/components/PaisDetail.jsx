import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paisDetail } from '../redux/actions';
import style from "./PaisDetail.module.css";

const PaisesDetail = (props) => {
  const dispatch = useDispatch();
  const paisId = props.match.params.id;
  const pais = useSelector(state => state.paisDetail);

  useEffect(() => {
    dispatch(paisDetail(paisId));
  }, [dispatch, paisId]);

  if (!pais || !pais.Actividades) {
    return <div></div>;
  }

  return (
    <div className={style.todo}>
      <p>{pais.id}</p>
      <h2>{pais.name}</h2>
      <p>Capital: {pais.capital}</p>
      <p>Población: {pais.poblacion} personas</p>
      <p>Continente: {pais.continente}</p>
      <p>Area: {pais.area} m²</p>
      <img src = {pais.img} alt="bandera" className={style.imagen}/>

      <h3 className={style.en}>Actividades en {pais.name}:</h3>
      {pais.Actividades.length > 0 ? (
        <div className={style.caja}>
        <ul className={style.acti}>
          {pais.Actividades.map((actividad, index) => (
            <li key={index}>
              <h4 className={style.title}>{actividad.name}</h4>
              <p>Dificultad: {actividad.dificultad}</p>
              <p>Duración: {actividad.duracion}</p>
              <p>Temporada: {actividad.temporada.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
        ) : (
          <div>

            <p className={style.en2}>Sin actividades aún</p>
            <img src="https://www.pngplay.com/wp-content/uploads/12/Sad-Emoji-Transparent-PNG.png" alt="Emoji" 
            className={style.imagen2} />
          </div>
        )}
      </div>
  );
};

export default PaisesDetail;
