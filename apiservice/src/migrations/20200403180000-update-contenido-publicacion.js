'use-strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Publicaciones', 'contenido', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    //
  }
}