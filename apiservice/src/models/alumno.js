'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define('Alumno', {
    alias: DataTypes.STRING,
    riesgo: DataTypes.INTEGER,
    configuracion_perfil: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'Alumnos',
    paranoid: true,
  });
  Alumno.associate = function(models) {
    Alumno.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'RESTRICT',
      as: 'cuenta',
    });
    Alumno.belongsTo(models.Curso, {
      foreignKey: 'curso_id',
      onDelete: 'RESTRICT',
      as: 'curso',
    });
    Alumno.belongsTo(models.Minoria, {
      foreignKey: 'minoria_id',
      onDelete: 'RESTRICT',
      as: 'minoria',
    });
    Alumno.belongsTo(models.PuebloIndigena, {
      foreignKey: 'pueblo_id',
      onDelete: 'RESTRICT',
      as: 'puebloIndigena',
    });
    Alumno.belongsTo(models.IdentidadGenero, {
      foreignKey: 'genero_id',
      onDelete: 'RESTRICT',
      as: 'identidadGenero',
    });
    Alumno.belongsTo(models.OrientacionSexual, {
      foreignKey: 'orientacion_id',
      onDelete: 'RESTRICT',
      as: 'orientacionSexual',
    });
    Alumno.hasMany(models.Foto, {
      foreignKey: 'alumno_id',
      as: 'fotos',
    });
    Alumno.hasMany(models.ContactoExterno, {
      foreignKey: 'alumno_id',
      as: 'contactosExternos',
    });
    Alumno.hasMany(models.Alerta, {
      foreignKey: 'alumno_id',
      as: 'alertas',
    });
    Alumno.hasMany(models.RiesgoDiario, {
      foreignKey: 'alumno_id',
      as: 'riesgosDiarios',
    });
    Alumno.hasMany(models.Evaluacion, {
      foreignKey: 'alumno_id',
      as: 'evaluaciones',
    });
    Alumno.belongsToMany(models.Funcionario, {
      through: 'Contacto',
      as: 'contactos',
      foreignKey: 'alumno_id',
      otherKey: 'contacto_id',
    });
    Alumno.belongsToMany(models.Usuario, {
      through: 'Alerta',
      as: 'receptores',
      foreignKey: 'alumno_id',
      otherKey: 'receptor_id',
    });
    Alumno.belongsToMany(models.Apoderado, {
      through: 'ApoderadoAlumno',
      as: 'apoderados',
      foreignKey: 'alumno_id',
      otherKey: 'apoderado_id',
    });
    Alumno.belongsToMany(models.Interes, {
      through: 'InteresAlumno',
      as: 'intereses',
      foreignKey: 'alumno_id',
      otherKey: 'interes_id',
    });
    Alumno.belongsToMany(models.Alumno, {
      through: 'Amigo',
      as: 'amigos',
      foreignKey: 'alumno_id',
      otherKey: 'amigo_id',
    });
    /*Alumno.belongsToMany(models.Alumno, {
      through: 'Amigo',
      as: 'amigos',
      foreignKey: 'amigo_id',
      otherKey: 'alumno_id',
    });*/
  };
  return Alumno;
};