import React from 'react';
import { connect } from 'react-redux';
import { ordenador } from "../../redux/actions";

const FilterForm = ({ dispatch }) => {

const onCheangorder = (e) => {
    dispatch(ordenador(e.target.value))
}

  return (
    <div>
      
      <select defaultValue="default" onChange={onCheangorder}>
        <option value="default">Alfabeticamente</option>
        <option value="AZ"> A-Z</option>
        <option value="ZA"> Z-A</option>
      </select>
    </div>
  );
};

export default connect()(FilterForm);
