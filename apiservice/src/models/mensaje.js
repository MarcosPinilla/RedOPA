'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mensaje = sequelize.define('Mensaje', {
    mensaje: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Mensajes',
    paranoid: true,
  });
  Mensaje.associate = function(models) {
    Mensaje.hasMany(models.Felicitacion, {
      foreignKey: 'mensaje_id',
      as: 'felicitaciones',
    });
  };
  return Mensaje;
};