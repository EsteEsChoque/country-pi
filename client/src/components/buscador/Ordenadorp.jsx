import React from 'react';
import { connect } from 'react-redux';
import { ordenadorPob } from "../../redux/actions";

const Ordenadorp = ({ dispatch }) => {

const onCheangorder = (e) => {
    dispatch(ordenadorPob(e.target.value))
}

  return (
    <div>
      
      <select defaultValue="default" onChange={onCheangorder}>
        <option value="default">Poblacion</option>
        <option value="Mas"> Mas</option>
        <option value="Menos"> Menos</option>
      </select>
    </div>
  );
};

export default connect()(Ordenadorp);
