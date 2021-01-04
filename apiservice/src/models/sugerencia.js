'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sugerencia = sequelize.define('Sugerencia', {
    titulo: DataTypes.STRING,
    contenido: DataTypes.STRING,
    fuente: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Sugerencias',
    paranoid: true,
  });
  Sugerencia.associate = function(models) {
    // associations can be defined here
  };
  return Sugerencia;
};