import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await mongoose.connect(process.env.COSMETIC_DB_URL, {
            dbName: process.env.COSMETIC_DB_NAME,
        });

        console.log("Connected to MongoDB with Mongoose");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Cannot connect to MongoDB:", err);
        process.exit(1);
    }
}

main();