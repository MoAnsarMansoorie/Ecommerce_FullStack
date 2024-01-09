import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import formidable from "express-formidable"
import { createProductController, deleteProductController, getPhotoController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, updateProductController } from "../controllers/productController.js"

const router = express.Router()

// routes
// creating product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)

// get product
router.get("/get-product", getProductController)

// get single product
router.get("/get-product/:slug", getSingleProductController)

// get photo
router.get("/product-photo/:pid", getPhotoController)

// delete product
router.delete("/delete-product/:pid", deleteProductController)

// update product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)

//filter product
router.post("/product-filters", productFiltersController);

//product count (pagination for load more)
router.get("/product-count", productCountController);

//product list based per page
router.get("/product-list/:page", productListController);

export default router