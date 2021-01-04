'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amigo = sequelize.define('Amigo', {
    estado: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Amigos',
    paranoid: true,
  });
  Amigo.associate = function(models) {
    Amigo.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      as: 'alumno',
      onDelete: 'RESTRICT',
    });
    Amigo.belongsTo(models.Alumno, {
      foreignKey: 'amigo_id',
      as: 'amigo',
      onDelete: 'RESTRICT',
    });
  };
  return Amigo;
};