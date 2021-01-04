'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notificacion = sequelize.define('Notificacion', {
    mensaje: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Notificaciones',
    paranoid: true,
  });
  Notificacion.associate = function(models) {
    Notificacion.belongsTo(models.Publicacion, {
      foreignKey: 'publicacion_id',
      onDelete: 'RESTRICT',
      as: 'publicacion',
    });
    Notificacion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'RESTRICT',
      as: 'receptor',
    });
  };
  return Notificacion;
};