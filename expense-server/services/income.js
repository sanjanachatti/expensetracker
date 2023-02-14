const { Router } = require("express");

const IncomeController = require("../controller/income");

const router = Router();
const { authenticateJWT } = require("../library/authVerify");

router.post("/get/incomes", authenticateJWT, IncomeController.getIncomeByMonth);
router.get("/get/incomes", authenticateJWT, IncomeController.getIncomes);
router.post(
  "/get/income/single",
  authenticateJWT,
  IncomeController.getIncomeById
);
router.post("/add/income", authenticateJWT, IncomeController.createIncome);
router.patch("/update/income", authenticateJWT, IncomeController.updateIncome);
router.delete("/delete/income", authenticateJWT, IncomeController.deleteIncome);

module.exports = router;
