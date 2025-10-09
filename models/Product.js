import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock cannot be negative"],
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null
  },

});

// INSTANCE METHODS
productSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

productSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// QUERY HELPER
productSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

const Product = mongoose.model("Product", productSchema);

export default Product;