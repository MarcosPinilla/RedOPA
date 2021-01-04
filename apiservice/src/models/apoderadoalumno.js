'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApoderadoAlumno = sequelize.define('ApoderadoAlumno', {
    parentesco: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Apoderados_alumnos',
    paranoid: true,
  });
  ApoderadoAlumno.associate = function(models) {
    ApoderadoAlumno.belongsTo(models.Apoderado, {
      foreignKey: 'apoderado_id',
      onDelete: 'RESTRICT',
      as: 'apoderado'
    });
    ApoderadoAlumno.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno'
    });
  };
  return ApoderadoAlumno;
};