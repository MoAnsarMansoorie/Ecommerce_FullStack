import express from "express"
import {forgotPasswordController, loginController, registerController, testController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

// router object
const router = express.Router()

// routing
// REGISTER || POST
router.post("/register", registerController)

// LOGIN || POST
router.post("/login", loginController)

// FORGOT_PASSWORD || POST
router.post("/forgot-password", forgotPasswordController)

// test
router.get("/test", requireSignIn, isAdmin, testController)

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok:true})
})

export default router