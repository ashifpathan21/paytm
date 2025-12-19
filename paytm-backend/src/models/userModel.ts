import mongoose, {  Schema, Types } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        selected: false,
        minLength: 6
    },
    amount: {
        type: Number,
        default: 100
    },
    transactions: [
        {
            type: Types.ObjectId,
            ref: "transaction"
        }
    ]
})

export default mongoose.model("user", userSchema)