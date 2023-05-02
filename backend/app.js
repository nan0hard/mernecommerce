import cookieParser from "cookie-parser";
import express from "express";
import * as path from "path";
const app = express();

import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";

import errorMiddleware from "./middleware/error.js";

// Config
dotenv.config({ path: "backend/config/.env" });

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// Route Imports
import product from "./routes/product.routes.js";
import user from "./routes/user.routes.js";
import order from "./routes/order.routes.js";
import payments from "./routes/payments.routes.js";

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payments);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// Middleware for errors
app.use(errorMiddleware);

export default app;
