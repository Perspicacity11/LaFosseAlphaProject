const {Router} = require ("express")
const userController = require("../controllers/user_controllers")

const userRouter = Router()

userRouter.get("/", userController.index)
userRouter.get("/:id", userController.show)
userRouter.patch("/:id", userController.update)
userRouter.delete("/:id", userController.destroy)
userRouter.post("/register", userController.signup);
userRouter.post("/login", userController.login);

//add Kyaw user routes can in

module.exports = userRouter;