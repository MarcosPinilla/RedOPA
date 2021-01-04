'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrientacionSexual = sequelize.define('OrientacionSexual', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Orientaciones_sexuales',
    paranoid: true,
  });
  OrientacionSexual.associate = function(models) {
    OrientacionSexual.hasMany(models.Alumno, {
      foreignKey: 'orientacion_id',
      as: 'alumno',
    });
  };
  return OrientacionSexual;
};