const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countrys', {
    id: {
      type: DataTypes.STRING(3),
      allowNull:false,
      primaryKey:true,
    },
    name: {     
      type: DataTypes.STRING,
      allowNull:true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    area: {
      type: DataTypes.DOUBLE,
      allowNull:true,
    },
    poblacion: {
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    maps: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    continente: {
      type: DataTypes.ENUM([ 'South America', 'North America','Europe','Asia', 'Oceania','Africa']),
      allowNull:true,
    }
  },
  {timestaps: false}
  );
};
