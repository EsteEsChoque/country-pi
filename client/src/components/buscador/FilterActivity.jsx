import React,{ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivity } from '../../redux/actions';
import style from './FilterActivity.module.css'
import { activityFilter } from "../../redux/actions";

const FilterActivity = ({actividades, setActividades,clearFilters}) => {
    const activity = useSelector(state => state.activity);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    


  const handleChange = (e) => {
    clearFilters();
    setActividades(e.target.value);
    console.log(actividades);
  };
    
    useEffect(() => {
      setIsLoading(false);
      dispatch(getActivity())
        .catch(err => console.error(err));
    }, []);
  
    if (isLoading) {
      return <p>Cargando actividades...</p>;
    }
  
    if (!activity || !activity.length) {
      return <p className={style.no}>No hay actividades disponibles.</p>;
    }
    
  
    return (
        <div className={style.caja}>
            <label htmlFor="continent" ><strong>Actividades</strong></label>
          <div className={style.scroll}>
            {activity.map(item => (
              <div key={item.name} className={style.alinear}>
                <input
                  type="radio"
                  id={item.name}
                  value={item.name}
                  onChange={handleChange}
                  checked={actividades === item.name}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            ))}
            
          </div>
          
        </div>
      );
    };
    
    export default FilterActivity;