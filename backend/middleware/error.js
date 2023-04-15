import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// Wrong MongoDB Id error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalid: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	// Mongoose duplicate error
	if (err.code === 11000) {
		const message = `${Object.keys(
			err.keyValue
		)} already exist! Please use a different ${Object.keys(err.keyValue)}`;
		err = new ErrorHandler(message, 400);
	}

	// Wrong JWT Token
	if (err.code === "JsonWebTokenError") {
		const message = `JSON Web Token is Invalid, Please Try again!`;
		err = new ErrorHandler(message, 400);
	}

	// JWT Expired error
	if (err.code === "TokenExpiredError") {
		const message = `JSON Web Token has been expired, Please Try again!`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({ success: false, error: err.message });
};

export default errorMiddleware;
