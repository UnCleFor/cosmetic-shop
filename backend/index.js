import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.COSMETIC_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

main().catch(console.error);