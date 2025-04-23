const { Router } = require('express');

const userController = require('../controllers/user_controllers');

const userRouter = Router();

userRouter.post("/register", userController.signup);
userRouter.post("/login", userController.login);

module.exports = userRouter;