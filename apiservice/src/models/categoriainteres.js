'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoriaInteres = sequelize.define('CategoriaInteres', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    icono_url: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Categorias_intereses',
    paranoid: true,
  });
  CategoriaInteres.associate = function(models) {
    CategoriaInteres.belongsTo(models.Institucion, {
      foreignKey: 'institucion_id',
      onDelete: 'RESTRICT',
      as: 'institucion',
    });
    CategoriaInteres.hasMany(models.Interes, {
      foreignKey: 'categoria_id',
      as: 'intereses',
    });
  };
  return CategoriaInteres;
};