import mongoose from "mongoose";
import slugify from "slugify";

const cosmeticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên mỹ phẩm không được để trống"],
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

    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },

    sold: {
        type: Number,
        min: 0,
        default: 0,
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
        type: String,
    }],

    // rating: {
    //     type: Number,   
    //     default: 0,
    //     min: 0,
    //     max: 5,
    // },

    // totalReviews: {
    //     type: Number,            
    //     default: 0,
    // }

}, {
    timestamps: true
});

//  Tự tạo slug từ name
cosmeticSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();
    this.slug = slugify(this.name, {
        lower: true
    });
    next();
});

const Cosmetic = mongoose.model("Cosmetic", cosmeticSchema);
export default Cosmetic;