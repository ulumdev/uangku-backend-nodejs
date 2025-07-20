const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

const apiResponse = (res, { status_code, message, data = null }) => {
  res.status(status_code).json({ status_code, message, data });
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Category, attributes: ["type"] }],
    });

    let total_income = 0;
    let total_expense = 0;
    transactions.forEach((tx) => {
      if (tx.Category.type === "income") {
        total_income += tx.amount;
      } else if (tx.Category.type === "expense") {
        total_expense += tx.amount;
      }
    });

    return apiResponse(res, {
      status_code: 200,
      message: "Summary data loaded",
      data: {
        total_income,
        total_expense,
        balance: total_income - total_expense,
      },
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};
