const express = require("express"),
  userRouter = express.Router(),
  userController = require("../controllers/users");

userRouter.post("/login", userController.login);

module.exports = userRouter;
