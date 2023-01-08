import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Nav from "./components/ruta2/Nav";
import Home from "./components/Home";
import QuienEsChoque from "./components/QuienEsChoque";
import PaisDetail from "./components/PaisDetail";
import BuscadorPais from "./components/buscador/BuscadorPais";
import {  getPaises, getActivity } from "./redux/actions";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import Actividades from './components/Actividades';


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPaises())
},)




  return (
    <React.Fragment>
      <Route exact path="/" component={Home}></Route>
      <Route path="/paises" render={() => <Nav />} />
      <Route path="/QuienEsChoque" render={() => <Nav />} />
      <Route path="/QuienEsChoque" component={QuienEsChoque} />

      <Route exact path="/paises/:id" component={PaisDetail}></Route>
      <Route exact path="/paises" component={BuscadorPais}></Route>
      <Route exact path="/paises/actividades" component={Actividades}></Route>
    </React.Fragment>
  );
}

export default App;
