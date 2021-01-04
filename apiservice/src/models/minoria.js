'use strict';
module.exports = (sequelize, DataTypes) => {
  const Minoria = sequelize.define('Minoria', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Minorias',
    paranoid: true,
  });
  Minoria.associate = function(models) {
    Minoria.hasMany(models.Alumno, {
      foreignKey: 'minoria_id',
      as: 'alumnos  ',
    });
  };
  return Minoria;
};