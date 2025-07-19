"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password_hash = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          email: "admin@uangku.com",
          password_hash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", { email: "admin@uangku.com" }, {});
  },
};
