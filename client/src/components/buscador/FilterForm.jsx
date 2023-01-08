import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { continentFilter } from "../../redux/actions";
import style from './FilterForm.module.css'

const FilterForm = ({ dispatch,continents, setContinents,clearFilters }) => {

  const handleChange = (e) => {
    clearFilters();
    const { value } = e.target;
    if (e.target.checked) {
      setContinents([...continents, value]);
    } else {
      setContinents(continents.filter((continent) => continent !== value));
    }
  }

  useEffect(()=> {dispatch(continentFilter(continents))},[continents]);

  return (
    <div className={style.caja}>

    <div >
      <div className={style.alinear}>


      <label htmlFor="continent" ><strong>Continentes</strong></label>
      <label>
        <input className={style.input}
          type="checkbox"
          value="Africa"
          checked={continents.includes('Africa')}
          onChange={handleChange}
          />
        África
      </label>
      <label>
        <input className={style.input}
          type="checkbox"
          value="Asia"
          checked={continents.includes('Asia')}
          onChange={handleChange}
          />
        Asia
      </label>
          </div>

          <div className={style.alinear}>
      <label>
        <input className={style.input}
          type="checkbox"
          value="Europe"
          checked={continents.includes('Europe')}
          onChange={handleChange}
          />
        Europa
      </label>
          </div>

          </div>


          <div className={style.alinear}>
      <label>
        <input className={style.input}
          type="checkbox"
          value="North America"
          checked={continents.includes('North America')}
          onChange={handleChange}
          />
        America del Norte
      </label>
          </div>
          <div className={style.alinear}>


      <label>
        <input className={style.input}
          type="checkbox"
          value="South America"
          checked={continents.includes('South America')}
          onChange={handleChange}
          />
        America del Sur
      </label>
          </div>
          <div className={style.alinear}>


          <div className={style.alinear}>
      <label>
        <input className={style.input}
          type="checkbox"
          value="Oceania"
          checked={continents.includes('Oceania')}
          onChange={handleChange}
          />
        Oceania
      </label>
          </div>
          </div>
    </div>
  );
};

export default connect()(FilterForm);
