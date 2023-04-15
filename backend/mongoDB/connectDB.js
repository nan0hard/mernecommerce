import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "backend/config/.env" });

mongoose.set("strictQuery", false);

const connectDB = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
		})
		.then((data) => {
			console.log(`MongoDB connected with server: ${data.connection.host}`);
		});
};

export default connectDB;
