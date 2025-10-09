import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

// Helper: soft delete
categorySchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Helper: restore
categorySchema.methods.restore = function () {
    this.deletedAt = null;
    return this.save();
};

// Query helper: only get non-deleted categories
categorySchema.query.notDeleted = function () {
    return this.where({ deletedAt: null });
};

categorySchema.query.deleted = function () {
    return this.where({ deletedAt: { $ne: null } });
};

const Category = mongoose.model("Category", categorySchema);

export default Category;