const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

const apiResponse = (res, { status_code, message, data = null }) => {
  res.status(status_code).json({ status_code, message, data });
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Category, attributes: ["name", "type"] }],
    });
    return apiResponse(res, {
      status_code: 200,
      message: "Daftar transaksi diambil",
      data: transactions,
    });
  } catch (err) {
    console.error(err);
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, description, category_id } = req.body;
    const transaction = await Transaction.create({
      amount,
      date,
      description,
      category_id,
      user_id: req.user.id,
    });
    return apiResponse(res, {
      status_code: 201,
      message: "Transaksi berhasil ditambah",
      data: transaction,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description, category_id } = req.body;
    const transaction = await Transaction.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!transaction) {
      return apiResponse(res, {
        status_code: 404,
        message: "Transaksi tidak ditemukan",
        data: null,
      });
    }
    transaction.amount = amount;
    transaction.date = date;
    transaction.description = description;
    transaction.category_id = category_id;
    await transaction.save();
    return apiResponse(res, {
      status_code: 200,
      message: "Transaksi berhasil diupdate",
      data: transaction,
    });
  } catch (err) {
    console.error(err);
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!transaction) {
      return apiResponse(res, {
        status_code: 404,
        message: "Transaksi tidak ditemukan",
        data: null,
      });
    }
    await transaction.destroy(); //Soft delete!
    return apiResponse(res, {
      status_code: 200,
      message: "Transaksi berhasil dihapus",
      data: null,
    });
  } catch (err) {
    console.error(err);
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

// Optional: Restore soft-deleted transaction
exports.restoreTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id, user_id: req.user.id },
      paranoid: false, // include soft-deleted
    });
    if (!transaction) {
      return apiResponse(res, {
        status_code: 404,
        message: "Transaksi tidak ditemukan",
        data: null,
      });
    }
    await transaction.restore();
    return apiResponse(res, {
      status_code: 200,
      message: "Transaksi berhasil direstore",
      data: transaction,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};
