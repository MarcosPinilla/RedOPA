'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institucion = sequelize.define('Institucion', {
    nombre: DataTypes.STRING,
    rut: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    foto_url: DataTypes.STRING,
    alertas: DataTypes.INTEGER,
    umbral_riesgo: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'Instituciones',
    paranoid: true,
  });
  Institucion.associate = function(models) {
    Institucion.hasMany(models.Usuario, {
      foreignKey: 'institucion_id',
      as: 'usuarios',
    });
    Institucion.hasMany(models.CategoriaInteres, {
      foreignKey: 'institucion_id',
      as: 'categorias',
    });
    Institucion.hasMany(models.Curso, {
      foreignKey: 'institucion_id',
      as: 'cursos',
    });
  };
  return Institucion;
};