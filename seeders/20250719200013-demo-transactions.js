"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          amount: 5000000,
          date: "2025-07-01",
          description: "Gaji bulanan Juli",
          category_id: 1, // Gaji
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          amount: 1000000,
          date: "2025-07-02",
          description: "Bonus proyek",
          category_id: 2, // Bonus
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          amount: 70000,
          date: "2025-07-03",
          description: "Sarapan pagi",
          category_id: 3, // Makan
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          amount: 30000,
          date: "2025-07-03",
          description: "Ojek ke kantor",
          category_id: 4, // Transportasi
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted_at: null,
        },
        {
          amount: 250000,
          date: "2025-07-04",
          description: "Belanja kebutuhan rumah",
          category_id: 5, // Belanja
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
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
