import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cosmetic",
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true,
            min: 1
        }
    }],

    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        ward: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        }
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "VNPAY", "MOMO", "PAYPAL"],
        default: "COD",
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    orderStatus: {
        type: String,
        enum: [
            "pending", // Đang chờ xử lý
            "confirmed", // Đã xác nhận
            "processing", // Đang chuẩn bị hàng
            "shipping", // Đang giao
            "completed", // Giao thành công
            "cancelled", // Đã hủy
            "returned" // Trả hàng
        ],
        default: "pending",
    },

    deliveredAt: {
        type: Date,
    },

    paymentAt: {
        type: Date,
    }
}, {
    timestamps: true, // Tự tạo createdAt, updatedAt
});

const Order = mongoose.model("Order", orderSchema);
export default Order;