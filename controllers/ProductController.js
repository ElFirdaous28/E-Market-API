import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error", error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated", Product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        // Find the Product by ID and delete
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json({ Products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}