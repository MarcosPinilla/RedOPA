'use strict';
module.exports = (sequelize, DataTypes) => {
  const Emocion = sequelize.define('Emocion', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Emociones',
    paranoid: true,
  });
  Emocion.associate = function(models) {
    Emocion.hasMany(models.Evaluacion, {
      foreignKey: 'emocion_id',
      as: 'evaluaciones',
    });
  };
  return Emocion;
};