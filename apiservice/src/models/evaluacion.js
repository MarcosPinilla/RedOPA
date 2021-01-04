'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evaluacion = sequelize.define('Evaluacion', {
    fecha: DataTypes.DATE,
    nivel: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Evaluaciones',
    paranoid: true,
  });
  Evaluacion.associate = function(models) {
    Evaluacion.belongsTo(models.Emocion, {
      foreignKey: 'emocion_id',
      onDelete: 'RESTRICT',
      as: 'emocion',
    });
    Evaluacion.belongsTo(models.Usuario, {
      foreignKey: 'evaluador_id',
      onDelete: 'RESTRICT',
      as: 'evaluador',
    });
    Evaluacion.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
  };
  return Evaluacion;
};