import cookieParser from "cookie-parser";
import express from "express";
const app = express();

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import errorMiddleware from "./middleware/error.js";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
import product from "./routes/product.routes.js";
import user from "./routes/user.routes.js";
import order from "./routes/order.routes.js";

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for errors
app.use(errorMiddleware);

export default app;
