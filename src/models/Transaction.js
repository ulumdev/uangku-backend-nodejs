const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category"); // Assuming Category model is in the same directory

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Transactions",
    paranoid: true, // Enables soft delete
    deletedAt: "deleted_at",
  }
);

Transaction.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Transaction;
