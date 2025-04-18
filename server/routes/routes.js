const {Router} = require ("express")
const userController = require("../controllers/user_controllers")
const sessionController = require("../controllers/session_controllers")

const userRouter = Router()
const sessionRouter = Router ()

sessionRouter.get("/", sessionController.index)
sessionRouter.get("/:id", sessionController.show)
sessionRouter.post("/", sessionController.create)
sessionRouter.delete("/:id", sessionController.destroy)

userRouter.get("/", userController.index)
userRouter.get("/:id", userController.show)
userRouter.post("/", userController.create)
userRouter.patch("/:id", userController.update)
userRouter.delete("/:id", userController.destroy)

module.exports = {
    userRouter, sessionRouter
}


