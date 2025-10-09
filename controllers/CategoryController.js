import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();

        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ message: "Category updated", updatedCategory: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        // Find the category by ID and delete
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().notDeleted();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Soft delete
export const softDeleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });

        category.deletedAt = new Date();
        await category.save();

        res.status(200).json({ message: "Category soft deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Restore
export const restoreCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });

        category.deletedAt = null;
        await category.save();

        res.status(200).json({ message: "Category restored" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all soft-deleted categories
export const getDeletedCategories = async (req, res) => {
    try {
        const categories = await Category.find().deleted();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};