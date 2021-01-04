'use strict';
module.exports = (sequelize, DataTypes) => {
  const Foto = sequelize.define('Foto', {
    nombre: DataTypes.STRING,
    perfil: DataTypes.INTEGER,
    foto_url: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Fotos',
    paranoid: true,
  });
  Foto.associate = function(models) {
    Foto.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
  };
  return Foto;
};