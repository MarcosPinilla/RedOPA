'use strict';
module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define('Funcionario', {
    cargo: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Funcionarios',
    paranoid: true,
  });
  Funcionario.associate = function(models) {
    Funcionario.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'RESTRICT',
      as: 'cuenta',
    });
    Funcionario.hasOne(models.Profesor, {
      foreignKey: 'funcionario_id',
      as: 'profesor',
    });
    Funcionario.hasMany(models.Publicacion, {
      foreignKey: 'funcionario_id',
      as: 'publicaciones',
    });
    Funcionario.belongsToMany(models.Alumno, {
      through: 'Contacto',
      as: 'contactos',
      foreignKey: 'contacto_id',
      otherKey: 'alumno_id',
    });
  };
  return Funcionario;
};