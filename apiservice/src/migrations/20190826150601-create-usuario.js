'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rut: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacimiento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      foto_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      configuracion_password: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      institucion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Instituciones',
          key: 'id',
        },
        allowNull: true,
      },
      permiso_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permisos',
          key: 'id',
        },
        allowNull: false,
      },
      genero_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Generos',
          key: 'id',
        },
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuarios');
  }
};