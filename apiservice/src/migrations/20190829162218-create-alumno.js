'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alias: {
        type: Sequelize.STRING
      },
      riesgo: {
        type: Sequelize.INTEGER
      },
      configuracion_perfil: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      curso_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cursos',
          key: 'id',
        },
        allowNull: false,
      },
      minoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Minorias',
          key: 'id',
        },
        allowNull: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        allowNull: false,
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
    return queryInterface.dropTable('Alumnos');
  }
};