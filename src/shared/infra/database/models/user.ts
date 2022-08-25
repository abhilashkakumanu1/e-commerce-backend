import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        _id: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, enum: ["buyer", "seller"] },
    },
    {
        timestamps: true,
    }
);

export const User = model("User", userSchema);
