import jwt from "jsonwebtoken";
import User from "../mongoDB/models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncErrorWrapper from "./catchAsyncErrors.js";

const isAuthenticatedUser = asyncErrorWrapper(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(
			new ErrorHandler("Please sign in to access this resource", 401)
		);
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decodedData.id);
	next();
});

const authorizedRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role: ${req.user.role} is not allowed to access this resource`,
					403
				)
			);
		}

		next();
	};
};

export { isAuthenticatedUser, authorizedRoles };
