'use strict';
module.exports = (sequelize, DataTypes) => {
  const Apoderado = sequelize.define('Apoderado', {
    //
  }, {
    freezeTableName: true,
    tableName: 'Apoderados',
    paranoid: true,
  });
  Apoderado.associate = function(models) {
    Apoderado.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'RESTRICT',
      as: 'cuenta',
    });
    Apoderado.belongsToMany(models.Alumno, {
      through: 'ApoderadoAlumno',
      as: 'pupilos',
      foreignKey: 'apoderado_id',
      otherKey: 'alumno_id',
    });
  };
  return Apoderado;
};