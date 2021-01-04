'use strict';
module.exports = (sequelize, DataTypes) => {
  const RiesgoDiario = sequelize.define('RiesgoDiario', {
    riesgo: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Riesgos_diarios',
    paranoid: true,
  });
  RiesgoDiario.associate = function(models) {
    RiesgoDiario.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
  };
  return RiesgoDiario;
};