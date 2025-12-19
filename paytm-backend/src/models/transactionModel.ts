import mongoose, { Schema, Types } from "mongoose";

const transactionSchema = new Schema({
    from: { type: Types.ObjectId, required: true, ref: "user" },
    to: { type: Types.ObjectId, required: true, ref: "user" },
    amount: { type: Number, required: true },
    tag: { type: String }
})

export default mongoose.model("transaction", transactionSchema)