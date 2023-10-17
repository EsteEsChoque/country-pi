import axios from "axios";

export const GET_PAISES = "GET_PAISES";
export const GET_ACTIVITY = "GET_ACTIVITY";

export const ORDENADOR = "ORDENADOR";
export const ORDENADORPOB = "ORDENADORPOB";

export const FILTERS = "FILTERS";
export const PAIS_FILTER = `PAIS_FILTER`;
export const CONTINENT_FILTER = "CONTINENT_FILTER";
export const ACTIVITY_FILTER = "ACTIVITY";

export const PAIS_DETAIL = "PAIS_DETAIL";
export const PAISES_SELECCIONADOS = "PAISES_SELECCIONADOS";


export const getPaises = () => {
  return async (dispatch) => {
    const data = await axios.get("/all");
    return dispatch({
      type: GET_PAISES,
      payload: data.data,
    });
  };
};

export const getActivity = () => {
  return async (dispatch) => {
    const data = await axios.get("/actividades");
    return dispatch({
      type: GET_ACTIVITY,
      payload: data.data,
    });
  };
};



export const ordenador = (az) => {
  return {
    type: ORDENADOR,
    payload: az,
  };

};

export const ordenadorPob = (m) => {
  return {
    type: ORDENADORPOB,
    payload: m,
  };
};



export const filters = (search, continents) => {
  return {
    type: FILTERS,
    payload: { search, continents },
  };
};

export const paisFilter = (search) => {
  return {
    type: PAIS_FILTER,
    payload: search,
  };
};

export const continentFilter = (continents) => {
    return {
      type: CONTINENT_FILTER,
      payload: continents,
    };
  };

  export const activityFilter = (activity) => {
    return async (dispatch) => {
      const data = await axios.get(`/actividades/${activity}`);
      return dispatch({
        type: ACTIVITY_FILTER,
        payload: data.data,
      });
    };
  };



export const paisDetail = (id) => {
  return async (dispatch) => {
    const data = await axios.get(`/paises/${id}`);
    return dispatch({
      type: PAIS_DETAIL,
      payload: data.data,
    });
  };
};

export const paisesSeleccionados1 = (pais) => {
  return {
    type: PAISES_SELECCIONADOS,
    payload: pais,
  }
}


