const Category = require("../models/Category");

const apiResponse = (res, { status_code, message, data = null }) => {
  res.status(status_code).json({ status_code, message, data });
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { user_id: req.user.id },
    });
    return apiResponse(res, {
      status_code: 200,
      message: "Daftar kategori diambil",
      data: categories,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = await Category.create({
      name,
      type,
      user_id: req.user.id,
    });
    return apiResponse(res, {
      status_code: 201,
      message: "Kategori berhasil ditambah",
      data: category,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const category = await Category.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!category) {
      return apiResponse(res, {
        status_code: 404,
        message: "Kategori tidak ditemukan",
        data: null,
      });
    }
    category.name = name;
    category.type = type;
    await category.save();
    return apiResponse(res, {
      status_code: 200,
      message: "Kategori berhasil diupdate",
      data: category,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!category) {
      return apiResponse(res, {
        status_code: 404,
        message: "Kategori tidak ditemukan",
        data: null,
      });
    }
    await category.destroy(); // Soft delete!
    return apiResponse(res, {
      status_code: 200,
      message: "Kategori berhasil dihapus",
      data: null,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};

// Optional: Restore soft-deleted category
exports.restoreCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, user_id: req.user.id },
      paranoid: false, // include soft-deleted
    });
    if (!category) {
      return apiResponse(res, {
        status_code: 404,
        message: "Kategori tidak ditemukan",
        data: null,
      });
    }
    await category.restore();
    return apiResponse(res, {
      status_code: 200,
      message: "Kategori berhasil direstore",
      data: category,
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error",
      data: null,
    });
  }
};
