const { Router } = require("express");

const ExpenseController = require("../controller/expense");
const { authenticateJWT } = require("../library/authVerify");

const router = Router();

router.post(
  "/get/expenses",
  authenticateJWT,
  ExpenseController.getExpensesByMonth
);

router.get("/get/expenses", authenticateJWT, ExpenseController.getExpenses);
router.post(
  "/get/expense/single",
  authenticateJWT,
  ExpenseController.getExpenseById
);
router.post("/add/expense", authenticateJWT, ExpenseController.createExpense);
router.patch(
  "/update/expense",
  authenticateJWT,
  ExpenseController.updateExpense
);
router.delete(
  "/delete/expense",
  authenticateJWT,
  ExpenseController.deleteExpense
);

module.exports = router;
