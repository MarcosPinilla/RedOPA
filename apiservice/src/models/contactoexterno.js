'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactoExterno = sequelize.define('ContactoExterno', {
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Contactos_externos',
    paranoid: true,
  });
  ContactoExterno.associate = function(models) {
    ContactoExterno.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id',
      onDelete: 'RESTRICT',
      as: 'alumno',
    });
  };
  return ContactoExterno;
};