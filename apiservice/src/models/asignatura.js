'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignatura = sequelize.define('Asignatura', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Asignaturas',
    paranoid: true,
  });
  Asignatura.associate = function(models) {
    Asignatura.belongsTo(models.Curso, {
      foreignKey: 'curso_id',
      as: 'curso',
      onDelete: 'RESTRICT',
    });
    Asignatura.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id',
      as: 'profesor',
      onDelete: 'RESTRICT',
    });
  };
  return Asignatura;
};
