import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusquedaForm from "./BusquedaForm"
import ActTemporada from "./ActTemporada"
import ActDuracion from "./ActDuracion"
import ActDificultad from "./ActDificultad"
import style from "./SegundoBuscador.module.css"
import style1 from "./Actividades.module.css"

const Actividades = () => {
  const [formData, setFormData] = useState({
      activityName: "",
      duration: "",
      difficulty: "normal",
      seasons: [],
      search: "",
      countryIds: [],
  });

  const [error, setError] = useState({
    nombre: "",
    duracion: "",
    temporada: "",
    paises: "",
  })
  
  const resetFormData = () => {
    setFormData({
      activityName: "",
      duration: "",
      difficulty: "normal",
      seasons: [],
      search: "",
      countryIds: [],
    });
  }

  const [buttonHidden, setButtonHidden] = useState(false);
  const [message, setMessage] = useState("");

  const [paisesSeleccionados, setPaisesSeleccionados] = useState([]);

  
  async function checkIfActivityExists(activityName) {
    try {
      const res = await axios.get(`http://localhost:3001/actividades/${activityName}`);
      console.log("hola",res.data.name);
      return res.data.activityExists;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  useEffect(() => {
    async function validateActivityName() {
       if (await checkIfActivityExists(formData.activityName)) {
        setError((prevState) => ({
          ...prevState,
          nombre: "Esa actividad ya está creada",
        }));
      }
    }
    console.log("+++++++++++++++++++");
    validateActivityName();
  }, [formData.activityName]);
  
  const validateForm = async() => {
    const { activityName, duration, difficulty, seasons, countryIds } = formData;

    const exists = await checkIfActivityExists(formData.activityName);
    setError({
      nombre:"",
      duracion: "",
      temporada: "",
      paises:""
    });
    
    if (!duration || duration === "0:00") {
      setError((prevState) => ({
        ...prevState,
        duracion: "Por favor, selecciona una duración válida",
      }));
    }
    if (countryIds.length === 0) {
      setError((prevState) => ({
        ...prevState,
        paises: "Por favor, selecciona al menos un país",
      }));
    }
    
    if (seasons.length === 0) {
      setError((prevState) => ({
        ...prevState,
        temporada: "Por favor, selecciona al menos una temporada",
      }));
    }
    if (!formData.activityName) {
      setError((prevState) => ({
        ...prevState,
        nombre: "Por favor, completa el campo nombre",
      }));
    }
    if (!/^[a-zA-Z0-9 ]*$/.test(formData.activityName)) {
      setError((prevState) => ({
        ...prevState,
        nombre: "No se permiten símbolos inválidos",
      }));
    }
    if (exists) {
      setError((prevState) => ({
        ...prevState,
        nombre: "Esa actividad ya está creada",
      }));
    }
    console.log(exists,"++++++++++++++++++");
    
  }
  useEffect(() => {
    async function validateFormWithAsync() {
      await validateForm();
    }
    validateFormWithAsync();
  }, [formData]);
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (prevState.seasons.includes(value) ? prevState.seasons.filter(season => season !== value) : [...prevState.seasons, value]) : value,
    }));
    validateForm();
  }
 

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada
    await validateForm();
    const { activityName, duration, difficulty, seasons, countryIds } = formData;
  
    if (!error.nombre && !error.duracion && !error.temporada && !error.paises) {
      // Envía los datos del formulario al servidor y vacía los datos del formulario si el envío es exitoso
      try {
        const res = await axios.post('http://localhost:3001/createActivity', JSON.stringify({
          activityData: {
            name: activityName,
            dificultad: difficulty,
            duracion: duration,
            temporada: seasons
          },
          countryIds: formData.countryIds
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setFormData({
          activityName: "",
          duration: "",
          difficulty: "normal",
          seasons: [],
          search: "",
          countryIds: [],
        });
        setButtonHidden(true);
      setMessage("Perfecto :D");
    
  
    setTimeout(() => {
      setButtonHidden(false);
    }, 2000);
        
      } catch (err) {
        console.error(err);
      } finally {setPaisesSeleccionados([])}
    }
  }
    
  console.log(error);
  const options = [];
  for (let i = 0; i <= 6; i++) {
  options.push(<option key={`${i}:00`} value={`${i}:00`}>{`${i}:00hs`}</option>);
  options.push(<option key={`${i}:30`} value={`${i}:30`}>{`${i}:30hs`}</option>);
}
  const difficulties = [
    { value: "muyFacil", label: "Muy fácil" },
    { value: "facil", label: "Fácil" },
    { value: "normal", label: "Normal" },
    { value: "dificil", label: "Difícil" },
    { value: "experimentados", label: "Experimentados" },
    ];

  const handleCountryIdsChange = newCountryIds => {
    setFormData(prevState => ({
      ...prevState,
      countryIds: newCountryIds,
    }));
    
  };

  return (
    <div className={style1.nav}>
      <form onSubmit={handleSubmit}>

        <div className={style.busca}>

          <label htmlFor="activityName">Nombre de la actividad:</label><br/>
          <input
            type="text" 
            id="activityName" 
            name="activityName" 
            value={formData.activityName} 
            onChange={handleChange}
            className={style1.input}/>
          <br/>

          <div>
            {error.nombre && <p className={style.errorNombre}>{error.nombre}</p>}
          </div>


          <div>
            {error.paises && <p className={style.errorpais}>Por favor, selecciona<br />al menos un país</p>}
          </div>

            <BusquedaForm 
              onCountryIdsChange={handleCountryIdsChange}
              paisesSeleccionados={paisesSeleccionados} 
              setPaisesSeleccionados={setPaisesSeleccionados}
            />
          </div>

          <div className={style.hora}>

            <ActDuracion
              handleChange={handleChange}
              formData={formData}
            />
            {error.duracion && <p className={style.errorhora}>{error.duracion}</p>}
          </div>

          <div className={style.dificultad}>
            <ActDificultad
              handleChange={handleChange}
              formData={formData}
            />
          </div>

          <div className={style.temporada}>

            <ActTemporada
              handleChange={handleChange}
              formData={formData}
            />
            {error.temporada && <p className={style.errortemporada}>{error.temporada}</p>}
          </div>
        <div>

      {buttonHidden ? (
        <div className={style.message}>{message}</div>
      ) : (
      // Si no, mostra
        <button onClick={validateForm} className={style.paisesactividad}>Paises para agregarle la actividad</button>
      )}
      </div>
    </form>
  </div> )}


export default Actividades;