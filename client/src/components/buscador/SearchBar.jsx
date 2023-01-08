import React, { useState }from 'react';

export default function SearchBar({onSearch}) {
  const [searchInput, setSearchInput] = useState ("");

  const chanHandler = (event) => {
    setSearchInput(event.target.value);
    
    /* console.log(searchInput); */
  }
  // acá va tu código
  return (<div >
    <input type="text" name="search" id="search" placeholder="buscador de paises"
    onChange={chanHandler} />
    <button onClick={()=>onSearch(searchInput)}>Buscar</button>
  </div>)
};