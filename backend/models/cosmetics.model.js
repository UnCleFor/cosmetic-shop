import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên sản phẩm không được để trống"],
        trim: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },

    brand: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    salePrice: {
        type: Number,
        min: 0,
        default: null,
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
    },

    volume: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        enum: ["Còn hàng", "Hết hàng", "Sắp về"],
        default: "Còn hàng",
    },

    images: [{
        type: String, // link ảnh
    }],

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    totalReviews: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

productSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();
    this.slug = slugify(this.name, {
        lower: true
    });
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;