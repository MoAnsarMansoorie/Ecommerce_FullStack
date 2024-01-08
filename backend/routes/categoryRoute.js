import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js"

// router object
const router = express.Router()

// routeing
// create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

// update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

// get all category
router.get("/get-category", categoryController)

// single category
router.get("/single-category/:slug", singleCategoryController)

// delet category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController )

export default router