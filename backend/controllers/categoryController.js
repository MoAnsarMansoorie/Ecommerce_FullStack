import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body

        if(!name) {
            return res.status(402).send("Name is required")
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category is already exists"
            })
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Category created successfully!",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create category",
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        const {id} = req.params

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
        res.status(201).send({
            success: true,
            message: "Category updated successfully!",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(201).send({
            success: true,
            message: "All category got successfully!",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting all category",
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const singleCategory = await categoryModel.findOne({slug: req.params.slug})
        res.status(201).send({
            success: true,
            message: "Single categoty got successfully!",
            singleCategory
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting single category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: "Successfully deleted!"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error
        })
    }
}