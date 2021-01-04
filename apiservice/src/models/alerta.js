'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alerta = sequelize.define('Alerta', {
    fecha: DataTypes.DATE,
    mensaje: DataTypes.STRING,
    tipo: DataTypes.INTEGER,
    leida: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'Alertas',
    paranoid: true,
  });
  Alerta.associate = function(models) {
    Alerta.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
    Alerta.belongsTo(models.Usuario, {
      foreignKey: 'receptor_id',
      onDelete: 'RESTRICT',
      as: 'receptor',
    });
  };
  return Alerta;
};