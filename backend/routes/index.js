import cosmeticRoutes from "../api/cosmetics.route.js";
import userRoutes from "../api/users.route.js";

export default function routes(app) {
    app.use("/api/cosmetics", cosmeticRoutes);
    app.use("/api/users", userRoutes);
}