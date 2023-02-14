const { Router } = require("express");

const CategoryController = require("../controller/category");

const router = Router();

//Category, Income, Expense are protected
const { authenticateJWT } = require("../library/authVerify");

//authenticateJWT will only execute for this request
router.get(
  "/get/all/categories",
  authenticateJWT,
  CategoryController.getAllCategories
);
router.post(
  "/get/categories",
  authenticateJWT,
  CategoryController.getCategories
);
router.post(
  "/add/category",
  authenticateJWT,
  CategoryController.createCategory
);

module.exports = router;
