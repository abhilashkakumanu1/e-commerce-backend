import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        currency: { type: String, default: "usd" },
        sellerId: { type: String, required: true, index: true, ref: "User" },
        createdAt: { type: Date, default: new Date() },
    },
    {
        timestamps: true,
    }
);

export const Product = model("Product", productSchema);
