import express from "express";
import { getProfile, isAvailable, Login, SignIn, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", Login)
router.post("/signin", SignIn)
router.put("/update", authMiddleware, updateUser);
router.get("/username", isAvailable);
router.get('/', authMiddleware, getProfile)


export default router 