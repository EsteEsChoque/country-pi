const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Actividades', {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
    },
    dificultad: {     
      type: DataTypes.STRING,
      allowNull:false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    temporada: {
      type: DataTypes.JSON,
      defaultValue: "Cualquier epoca"
    }
  },
  {timestaps: false}
  );
};
