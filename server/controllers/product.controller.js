import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => { 
    const { name, image, price, category, description } = req.body;
    if(!name || !image || !price || !category || !description) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try{
        const product = await Product.create({
            name,
            image,
            price,
            category,
            description
        })

        return res.status(201).json({ success: true, data: product });
    }catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try{
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product });
    }catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try{
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product });
    }catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try{
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product });
    }catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}