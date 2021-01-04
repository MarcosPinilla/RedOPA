'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interes = sequelize.define('Interes', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    icono_url: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Intereses',
    paranoid: true,
  });
  Interes.associate = function(models) {
    Interes.hasMany(models.Publicacion, {
      foreignKey: 'interes_id',
      as: 'publicaciones',
    });
    Interes.belongsToMany(models.Alumno, {
      through: 'InteresAlumno',
      as: 'alumnos',
      foreignKey: 'interes_id',
      otherKey: 'alumno_id'
    });
    Interes.belongsTo(models.CategoriaInteres, {
      foreignKey: 'categoria_id',
      onDelete: 'RESTRICT',
      as: 'categoria',
    });
  };
  return Interes;
};