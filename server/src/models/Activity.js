const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    dificultad:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 5,
        min: 1,
      }
    },
    duracion:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    temporada:{
      type:DataTypes.ENUM('verano','otoño','invierno','primavera'),
      allowNull:false
    },
  });
};