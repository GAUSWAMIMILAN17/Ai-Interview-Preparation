import express from "express";
import {registerUser, loginUser, getUserProfile, uploadImage, logOut, updateImage} from "../controllers/authController.js"
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);  // Register User
router.post("/login", loginUser);    // Login User
router.get("/profile", protect, getUserProfile); 
router.post("/upload-image", upload.single("image"), uploadImage)
router.post("/update-image",protect, upload.single("image"), updateImage)
router.post("/logout", logOut);

export default router;