'use strict';
module.exports = (sequelize, DataTypes) => {
  const PuebloIndigena = sequelize.define('PuebloIndigena', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Pueblos_indigenas',
    paranoid: true,
  });
  PuebloIndigena.associate = function(models) {
    PuebloIndigena.hasMany(models.Alumno, {
      foreignKey: 'pueblo_id',
      as: 'alumno',
    });
  };
  return PuebloIndigena;
};