import {
  GET_PAISES,
  GET_ACTIVITY,
  ORDENADOR,
  ORDENADORPOB,
  FILTERS,
  PAIS_FILTER,
  CONTINENT_FILTER,
  ACTIVITY_FILTER,
  PAIS_DETAIL,
  PAISES_SELECCIONADOS,
} from "../actions";

const initialState = {
  paises: [],
  pais: [],
  paisDetail: {},
  cosas: "",
  continents: [],
  paisSelec: [],
  activity: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAISES:
      return {
        paises: action.payload,
        pais: action.payload,
        continents: [],
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        

      };

    case ORDENADOR:
      function compareAZ(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      function compareZA(a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      }
      return {
        paises: state.paises,
        pais:
          action.payload === "AZ"
            ? state.pais.sort(compareAZ)
            : state.pais.sort(compareZA),
      };

    case ORDENADORPOB:
      function menor(a, b) {
        if (a.poblacion < b.poblacion) {
          return -1;
        }
        if (a.poblacion > b.poblacion) {
          return 1;
        }
        return 0;
      }
      function mayor(a, b) {
        if (a.poblacion > b.poblacion) {
          return -1;
        }
        if (a.poblacion < b.poblacion) {
          return 1;
        }
        return 0;
      }
      return {
        paises: state.paises,
        pais:
          action.payload === "Mas"
            ? state.pais.sort(mayor)
            : state.pais.sort(menor),
      };

    case FILTERS:
      const { search, continents } = action.payload;
      let filteredCountries = state.paises;
      if (search) {
        filteredCountries = filteredCountries.filter((dato) =>
          dato.name.toLowerCase().includes(search.toLocaleLowerCase())
        );
      }
      if (continents.length) {
        filteredCountries = filteredCountries.filter((dato) =>
          continents.includes(dato.continente)
        );
      }
      return {
        ...state,
        pais: filteredCountries.length ? filteredCountries : state.paises, 
      };
    case PAIS_FILTER:
      return {
        ...state,
        pais: !action.payload
          ? state.paises
          : state.paises.filter((dato) =>
              dato.name
                .toLowerCase()
                .includes(action.payload.toLocaleLowerCase())
            ),
        filter: action.payload,
      };
    case CONTINENT_FILTER:
      return {
        ...state,
        pais: !action.payload.length
          ? state.paises
          : state.paises.filter((dato) =>
              action.payload.includes(dato.continente)
            ),
        filter: state.filter,
      };
      case ACTIVITY_FILTER:
        const { name, Countrys } = action.payload;
        const countryIds = Countrys && Array.isArray(Countrys)
          ? Countrys.map(country => country.id)
          : [];
        return {
          ...state,
          pais: countryIds.length
            ? state.paises.filter(pais => countryIds.includes(pais.id))
            : state.paises
        };
  

    case PAIS_DETAIL:
      return {
        ...state,
        paisDetail: action.payload,
      };
    case PAISES_SELECCIONADOS:
      return {
        ...state,
        paisSelec: !action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
