import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null
  },
});

// Helper: soft delete
userSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// Helper: restore
userSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// Query helper: only get non-deleted users
userSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

userSchema.query.deleted = function () {
  return this.where({ deletedAt: { $ne: null } });
};

const User = mongoose.model("User", userSchema);

export default User;