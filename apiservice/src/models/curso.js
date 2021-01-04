'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    nivel: DataTypes.INTEGER,
    letra: DataTypes.STRING,
    etapa: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'Cursos',
    paranoid: true,
  });
  Curso.associate = function(models) {
    Curso.hasMany(models.Asignatura, {
      foreignKey: 'curso_id',
      as: 'asignaturas',
    });
    Curso.hasMany(models.Alumno, {
      foreignKey: 'curso_id',
      as: 'alumnos',
    });
    Curso.belongsTo(models.Institucion, {
      foreignKey: 'institucion_id',
      as: 'institucion',
      onDelete: 'RESTRICT',
    })
  };
  return Curso;
};
