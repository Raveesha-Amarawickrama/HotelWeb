import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();
app.use("/api", routes);
app.use(errorHandler);

export default app;
