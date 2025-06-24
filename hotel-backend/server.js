import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect DB
connectDB();

// API Routes
app.use("/api", routes);

// Error handler
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
