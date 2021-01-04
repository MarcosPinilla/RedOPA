'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefono: DataTypes.STRING,
    rut: DataTypes.STRING,
    nacimiento: DataTypes.DATE,
    estado: DataTypes.INTEGER,
    foto_url: DataTypes.STRING,
    configuracion_password: DataTypes.INTEGER,
    consentimiento: DataTypes.DATE,
  }, {
    freezeTableName: true,
    tableName: 'Usuarios',
    paranoid: true,
  });
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Institucion, {
      foreignKey: 'institucion_id',
      onDelete: 'RESTRICT',
      as: 'institucion',
    });
    Usuario.belongsTo(models.Permiso, {
      foreignKey: 'permiso_id',
      onDelete: 'RESTRICT',
      as: 'permiso',
    });
    Usuario.belongsTo(models.Genero, {
      foreignKey: 'genero_id',
      onDelete: 'RESTRICT',
      as: 'genero',
    });
    Usuario.hasOne(models.Funcionario, {
      foreignKey: 'usuario_id',
      as: 'funcionario',
    });
    Usuario.hasOne(models.Alumno, {
      foreignKey: 'usuario_id',
      as: 'alumno',
    });
    Usuario.hasOne(models.Apoderado, {
      foreignKey: 'usuario_id',
      as: 'apoderado'
    });
    Usuario.hasMany(models.Evaluacion, {
      foreignKey: 'evaluador_id',
      as: 'evaluaciones',
    })
    Usuario.hasMany(models.Alerta, {
      foreignKey: 'receptor_id',
      as: 'alertas',
    });
    Usuario.belongsToMany(models.Usuario, {
      through: 'Felicitacion',
      as: 'receptores',
      foreignKey: 'usuario_emisor_id',
      otherKey: 'usuario_receptor_id',
    });
    Usuario.belongsToMany(models.Usuario, {
      through: 'Felicitacion',
      as: 'emisores',
      foreignKey: 'usuario_receptor_id',
      otherKey: 'usuario_emisor_id',
    });
    Usuario.belongsToMany(models.Alumno, {
      through: 'Alerta',
      as: 'receptores_alertas',
      foreignKey: 'receptor_id',
      otherKey: 'alumno_id',
    });
    Usuario.belongsToMany(models.Publicacion, {
      through: 'Notificacion',
      as: 'receptores_notificaciones',
      foreignKey: 'usuario_id',
      otherId: 'publicacion_id',
    });
  };
  return Usuario;
};