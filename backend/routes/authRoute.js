import express from "express"
import {forgotPasswordController, loginController, registerController, testController, updateProfileController} from "../controllers/authController.js"
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

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok:true})
})

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok:true})
})

// update profile
router.put("/profile", requireSignIn, updateProfileController)

export default router