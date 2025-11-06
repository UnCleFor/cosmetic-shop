import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên không được để trống"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email không được để trống"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Mật khẩu không được để trống"],
        minlength: [6, "Mật khẩu ít nhất 6 kí tự"],
        select: false, // Không trả về password trong response
    },

    admin: {
        type: Boolean,
        default: false,
    },

    phone: {
        type: String,
        default: "",
    },

    avatar: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
});

// ✅ Hash mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
    // Nếu mật khẩu không thay đổi → bỏ qua
    if (!this.isModified("password")) return next();

    // Hash password
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ So sánh mật khẩu khi login
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;