'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publicacion = sequelize.define('Publicacion', {
    titulo: DataTypes.STRING,
    contenido: DataTypes.STRING,
    fecha: DataTypes.DATE,
    foto_url: DataTypes.STRING,
    visibilidad: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'Publicaciones',
    paranoid: true,
  });
  Publicacion.associate = function(models) {
    Publicacion.belongsTo(models.Funcionario, {
      foreignKey: 'funcionario_id',
      onDelete: 'RESTRICT',
      as: 'autor',
    });
    Publicacion.belongsTo(models.Interes, {
      foreignKey: 'interes_id',
      onDelete: 'RESTRICT',
      as: 'interes',
    });
    Publicacion.belongsToMany(models.Usuario, {
      through: 'Notificacion',
      as: 'lectores',
      foreignKey: 'publicacion_id',
      otherId: 'usuario_id',
    });
  };
  return Publicacion;
};