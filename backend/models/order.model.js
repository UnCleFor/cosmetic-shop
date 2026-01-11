import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Cosmetic",
                    required: true,
                },
                name: String,
                price: Number,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                image: String,
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            name: String,
            phone: String,
            address: String,
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "paypal", "momo", "banking"],
            default: "cod",
        },

        status: {
            type: String,
            enum: ["confirming", "processing", "shipping", "completed", "cancelled", "deleted"],
            default: "confirming",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
