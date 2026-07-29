import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionsRoutes.js";
import protect from "./middlewares/authMiddleware.js";
import {
  generateInterviewQuestions,
  generateConceptExplaination,
} from "./controllers/aiController.js";
import cloudinary from "./config/cloudinary.js";

const app = express();

//middleware to handle CORS
app.use(
  cors({
    origin: [ process.env.FRONTEND_URL], // React frontend URL "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplaination);

//Server upload folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
