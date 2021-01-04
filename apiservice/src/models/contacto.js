'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contacto = sequelize.define('Contacto', {
    tipo: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Contactos',
    paranoid: true,
  });
  Contacto.associate = function(models) {
    Contacto.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
    Contacto.belongsTo(models.Funcionario, {
      foreignKey: 'contacto_id',
      onDelete: 'RESTRICT',
      as: 'contacto',
    });
  };
  return Contacto;
};