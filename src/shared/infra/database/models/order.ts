import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        _id: String,
        buyerId: { type: String, required: true, index: true, ref: "User" },
        productIds: [{ type: String, required: true, index: true, ref: "Product" }],
    },
    {
        timestamps: true,
    }
);

export const Order = model("Order", orderSchema);
