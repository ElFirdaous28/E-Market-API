import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
