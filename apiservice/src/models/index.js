const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const models = {};

import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    models[model.name] = model;
  });

/**const models = {
  Permiso: sequelize.import('./permiso'),
  Genero: sequelize.import('./genero'),
  Institucion: sequelize.import('./institucion'),
  Usuario: sequelize.import('./usuario'),
  Mensaje: sequelize.import('./mensaje'),
  Felicitacion: sequelize.import('./felicitacion'),
  Funcionario: sequelize.import('./funcionario'),
  Profesor: sequelize.import('./profesor'),
  Curso: sequelize.import('./curso'),
  Asignatura: sequelize.import('./asignatura'),
  Alumno: sequelize.import('./alumno'),
  Apoderado: sequelize.import('./apoderado'),
  ApoderadoAlumno: sequelize.import('./apoderadoalumno'),
  Interes: sequelize.import('./interes'),
  Publicacion: sequelize.import('./publicacion'),
  InteresAlumno: sequelize.import('./interesalumno'),
  Foto: sequelize.import('./foto'),
  ContactoExterno: sequelize.import('./contactoexterno'),
  Contacto: sequelize.import('./contacto'),
  Alerta: sequelize.import('./alerta'),
  Amigo: sequelize.import('./amigo'),
  Notificacion: sequelize.import('./notificacion'),
}*/

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;

/**'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;*/
