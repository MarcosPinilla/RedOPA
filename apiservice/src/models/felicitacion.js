'use strict';
module.exports = (sequelize, DataTypes) => {
  const Felicitacion = sequelize.define('Felicitacion', {
    fecha: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Felicitaciones',
    paranoid: true,
  });
  Felicitacion.associate = function(models) {
    Felicitacion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_emisor_id',
      onDelete: 'RESTRICT',
      as: 'emisor',
    });
    Felicitacion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_receptor_id',
      onDelete: 'RESTRICT',
      as: 'receptor',
    });
    Felicitacion.belongsTo(models.Mensaje, {
      foreignKey: 'mensaje_id',
      onDelete: 'RESTRICT',
      as: 'mensaje',
    });
  };
  return Felicitacion;
};