"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Gaji",
          type: "income",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          name: "Bonus",
          type: "income",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          name: "Makan",
          type: "expense",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          name: "Transportasi",
          type: "expense",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          name: "Belanja",
          type: "expense",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
