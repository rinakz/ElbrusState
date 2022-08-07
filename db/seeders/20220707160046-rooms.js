module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Rooms',
      [
        { title: 'TYPESCRIPT' },
        { title: 'PHASE 3' },
        { title: 'ГАРДЕРОБ' },
        { title: 'ДИВАН' },
        { title: 'RUST' },
        { title: 'ГАРДЕРОБ' },
        { title: 'PHASE 2' },
        { title: 'КУХНЯ' },
        { title: 'ДИВАН' },
        { title: 'ШАБЛИ' },
        { title: 'ПРЕПОДАВАТЕЛЬСКАЯ' },
        { title: 'KOTLIN' },
        { title: 'PYTHON' },
        { title: 'ASSEMBLER' },
        { title: 'КУХНЯ' },
        { title: 'RUBY' },
        { title: 'GOLANG' },
        { title: 'КУХНЯ' },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};
