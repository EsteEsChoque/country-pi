import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.container}>
        <h1 className={style.titulo}>Henry's PI</h1>
        <h3 className={style.h3}>Countries APP</h3> {/* agrega la clase aquí */}
        <NavLink to="/paises">
            <button className={style.button}>
                <span className={style.box}>
                    Start
                </span>
            </button>
        </NavLink>
    </div>
  );
};

export default Home;
