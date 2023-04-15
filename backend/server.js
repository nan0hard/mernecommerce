import { v2 as cloudinary } from "cloudinary";

import app from "./app.js";
import * as dotenv from "dotenv";
import connectDB from "./mongoDB/connectDB.js";

// Handling Uncaught Exceptions
process.on("uncaughtException", (error) => {
	console.log(`Error: ${error.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);

	process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/.env" });

// Connecting with DB
connectDB();

// Cloudinary Integration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
