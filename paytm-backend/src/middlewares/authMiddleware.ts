import { config } from "dotenv";
import type { NextFunction, Request, Response } from "express";
config()
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { mongo } from "mongoose";
import type { UserRequest } from "../types/express/index.js";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined ")
}


export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is Missing"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(501).json({
                success: false,
                message: "Invalid Token"
            })
        }
        req.user = { id: new mongoose.Types.ObjectId(decoded.toString()) };
        next()

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "Unauthorized"
        })
    }
} 