// Services files are where we match some routes to their functionalities

const { Router } = require("express");

const UserController = require("../controller/auth");

const router = Router();

// Mapping the user controller for a valid user
router.post("/valid/user", UserController.validUser);
router.post("/add/user", UserController.createUser);

module.exports = router;
