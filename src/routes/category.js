const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, CategoryController.getCategories);
router.post("/", authMiddleware, CategoryController.createCategory);
router.put("/:id", authMiddleware, CategoryController.updateCategory);
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

module.exports = router;
