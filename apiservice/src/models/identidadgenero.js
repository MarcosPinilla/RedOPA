'use strict';
module.exports = (sequelize, DataTypes) => {
  const IdentidadGenero = sequelize.define('IdentidadGenero', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Identidades_genero',
    paranoid: true,
  });
  IdentidadGenero.associate = function(models) {
    IdentidadGenero.hasMany(models.Alumno, {
      foreignKey: 'genero_id',
      as: 'alumno',
    });
  };
  return IdentidadGenero;
};