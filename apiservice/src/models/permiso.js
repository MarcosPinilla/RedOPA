'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Permisos',
    paranoid: true,
  });
  Permiso.associate = function(models) {
    Permiso.hasMany(models.Usuario, {
      foreignKey: 'permiso_id',
      as: 'usuarios',
    });
  };
  return Permiso;
};