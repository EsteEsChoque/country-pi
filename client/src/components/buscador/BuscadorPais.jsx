import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Paginado from "./Paginado.jsx";

import Card from "../ruta2/Card";
import {paisFilter,getActivity,activityFilter} from "../../redux/actions";
import Ordenador from "./Ordenador.jsx";
import FilterForm from "./FilterForm.jsx";
import Ordenadorp from "./Ordenadorp.jsx"
import FilterActivity from "./FilterActivity.jsx";


import style from "./BuscadorPais.module.css";

const BuscadorPais = () => {
    useEffect(() => {
        dispatch(getActivity())
      },)


    const todopais = useSelector((state) => state)
    console.log(todopais);
    const dispatch = useDispatch()
    const [ search, setSearch ] = useState("")
    const [actividades, setActividades] = useState("");
    const [continents, setContinents] = useState([]);

    const clearFilters = () => {
        setSearch("");
        setActividades("");
        setContinents([]);
      }
    

//------------------------------------------
// Set
    const searcher = (e) => {
        clearFilters();
        setSearch(e.target.value);
        setCurrentPage(1); // <-- Set
        dispatch(paisFilter(search));
    }
    useEffect(() => {
        setCurrentPage(1)
        dispatch(paisFilter(search))
    },[search])
    useEffect(() => {
        setCurrentPage(1)
        dispatch(activityFilter(actividades))
    },[actividades])
    useEffect(() => {
        setCurrentPage(1)
        dispatch(activityFilter(continents))
    },[continents])
//-----------------------------------------
    

    const [currentPage, setCurrentPage] = useState(1);
    const countrysPerPage = 9;
    const indexLastCountry = currentPage * countrysPerPage ;
    const indexFirstCountry = indexLastCountry - countrysPerPage ;
    const countrysCurrentPage = todopais.pais.slice(indexFirstCountry, indexLastCountry); 

    
    return (
        <div className={style.nav} >
            <div className={style.contenedorbuscarpaises}></div>
            <div className={style.nav}>
            <FilterForm
            continents={continents}
            setContinents={setContinents}
            clearFilters={clearFilters}
            />
                <div className={style.ordenadores}>
                <label htmlFor="continent" ><strong>Ordenar por:</strong></label>
            <Ordenador/>
            <Ordenadorp/>
                </div>
            <FilterActivity
            actividades= {actividades}
            setActividades={setActividades}
            clearFilters={clearFilters}
            />
            </div>
            <label htmlFor="buscar_pais" className={style.pos1} ><strong>Buscar pais</strong></label>
            <input value={search} onChange={searcher} type="text"  id="buscador_pais" 
            placeholder="¿En qué paises?"
            className={style.input}/>
                <p className={style.p}><strong>cantidad de paises: {todopais.pais.length}</strong></p>
            <div className={style.cardContainer} >
            { 
            countrysCurrentPage.map(
                pais=> < Card 
                name = {pais.name} 
                capital = {pais.capital} 
                img = {pais.img}
                continente = {pais.continente}
                poblacion = {pais.poblacion}
                id = {pais.id}
                key = {pais.id}
                />
                ) 
            }
        </div>
        <div>
            <Paginado 
            allCountrys={todopais.pais.length} 
            currentPage={currentPage}
            pagedNumber={setCurrentPage}  
            countrysPerPage= {countrysPerPage}/>
        </div>
        </div>
    )
}
export default BuscadorPais