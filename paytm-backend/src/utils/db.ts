import mongoose, { MongooseError } from "mongoose";
import { config } from "dotenv";
config();
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to Database")
    } catch (error) {
        if (error instanceof MongooseError) {
            console.log("Error Connecting Database");
            throw new Error(error.message)
        }
    }
}