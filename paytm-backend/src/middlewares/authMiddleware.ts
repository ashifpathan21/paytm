import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import type { UserRequest } from "../types/express/index.js";
import { JWT_SECRET } from "../config.js";
import mongoose from "mongoose";




export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is Missing"
            })
        }

        const decoded  = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(501).json({
                success: false,
                message: "Invalid Token"
            })
        }
        req.user = { id: new mongoose.Types.ObjectId(decoded.id.toString()) };
        next()

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "Unauthorized"
        })
    }
} 