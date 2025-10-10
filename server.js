import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRouter.js";
import productRoutes from "./routes/productRouter.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";


dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// logger
app.use(logger);

// Test route
app.get("/", (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Catch all unknown routes
app.use(notFound);
app.use(errorHandler);