import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

// creating product
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = new productModel({...req.fields, slug:slugify(name)})
    if(photo) {
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
    }
    await product.save()
    res.status(201).send({
        success: true,
        message: "Product created successfully!",
        product
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
    try {
      const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1})
      res.status(201).send({
        success: true,
        countTotal: products.length,
        message: "Products got successfully",
        products
      })
      
    } catch (error) {
      console.log(error)
      res.status(401).send({
        success: false,
        message: "Error while getting all products",
        error
      })
    }
}

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category")
    res.status(200).send({
      success: true,
      message: "single product fetched successfully!",
      product
    })
    
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      message: "Error while getting single product",
      error
    })
  }
}

export const getPhotoController = async (req, res) => {
  try {
    const product = productModel.findById(req.params.pid).select("photo")
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

  } catch (error) {
    console.log(error)    
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error
    })
  }
}

// delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
      success: true,
      message: "Product deleted successfully!"
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while deleting product"
    })
  }
}

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};