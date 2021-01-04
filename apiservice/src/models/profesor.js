'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesor', {
    //
  }, {
    freezeTableName: true,
    tableName: 'Profesores',
    paranoid: true,
  });
  Profesor.associate = function(models) {
    Profesor.belongsTo(models.Funcionario, {
      foreignKey: 'funcionario_id',
      as: 'funcionario',
    });
    Profesor.hasMany(models.Asignatura, {
      foreignKey: 'profesor_id',
      as: 'asignaturas',
    });
  };
  return Profesor;
};
