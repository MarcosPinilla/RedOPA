'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define('Genero', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Generos',
    paranoid: true,
  });
  Genero.associate = function(models) {
    Genero.hasMany(models.Usuario, {
      foreignKey: 'genero_id',
      as: 'usuarios',
    });
  };
  return Genero;
};