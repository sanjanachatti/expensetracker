const { Router } = require("express");

const DashboardController = require("../controller/dashboard");

const router = Router();
const { authenticateJWT } = require("../library/authVerify");

router.post(
  "/dash",
  authenticateJWT,
  DashboardController.getDashboardDataByMonth
);
router.get(
  "/graph",
  authenticateJWT,
  DashboardController.getGraphData
);

module.exports = router;
