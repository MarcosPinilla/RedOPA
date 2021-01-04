'use strict';
module.exports = (sequelize, DataTypes) => {
  const InteresAlumno = sequelize.define('InteresAlumno', {
    //
  }, {
    freezeTableName: true,
    tableName: 'Intereses_alumnos',
    paranoid: true,
  });
  InteresAlumno.associate = function(models) {
    InteresAlumno.belongsTo(models.Interes, {
      foreignKey: 'interes_id',
      onDelete: 'RESTRICT',
      as: 'interes',
    });
    InteresAlumno.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
  };
  return InteresAlumno;
};