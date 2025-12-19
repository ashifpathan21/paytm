import type { Request, Response } from "express";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv";
import { MongooseError } from "mongoose";
import type { UserRequest } from "../types/express/index.js";
config();


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not Defined")
}


export const SignIn = async (req: Request, res: Response) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        if (!username || !password || !firstName) {
            return res.status(400).json({
                success: false,
                message: "Fields are missing"
            })
        }
        const existing = await UserModel.findOne({ username });
        if (existing) {
            return res.status(401).json({
                success: false,
                message: "User already Exist"
            })
        }

        const hashPass = await bcrypt.hash(password, 16);
        const user = await UserModel.create({
            firstName,
            lastName,
            username,
            password: hashPass
        })
        const token = jwt.sign(user._id, JWT_SECRET, {
            expiresIn: "2d"
        });
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            token: token
        })
    } catch (error) {
        if (error instanceof MongooseError) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}




export const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are Missing"
            })
        }

        const user = await UserModel.findOne({ username }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(501).json({
                success: false,
                message: "Incorrect Username or Password"
            })
        }
        const token = await jwt.sign(user._id, JWT_SECRET, {
            expiresIn: "2d"
        });
        return res.status(200).json({
            success: true,
            message: "Logged In ",
            data: token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


export const getProfile = async (req: UserRequest, res: Response) => {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return res.status(501).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const user = UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found "
            })
        }
        return res.status(200).json({
            success: true,
            message: "",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const isAvailable = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await UserModel.findOne(username);
        return res.status(200).json({
            success: true,
            message: user ? "Not Available" : "Available"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const updateUser = async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(501).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const { firstName, lastName, password } = req.body;
        const user = await UserModel.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            password
        });
        return res.status(200).json({
            success: true,
            message: "Update Successful"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}