import React from 'react';
import style from "./Nav.module.css";
import { Link } from 'react-router-dom';
import planeta33 from '../img/planeta33.png';

function Nav() {
  return (
    <div className={style.nav} >
      <div className={style.nav2}>

        <p><Link to ="/" className={style.boton}> Home</Link></p>
        <p><Link to = "/paises" className={style.boton}> Paises</Link></p>
        <p><Link to = "/paises/actividades" className={style.boton}> Crear actividad</Link></p>
        <p><Link to = "/QuienEsChoque" className={style.boton}> By: Choque</Link></p>
        <p><a href="https://www.soyhenry.com/" target="_blank" className={style.boton}>Soy Henry</a></p>

      <div >
        
      <img src={planeta33} alt='planeta'className={style.imagen2}></img>
      </div>
      </div>
      
    </div>
  );
};
export default Nav;
