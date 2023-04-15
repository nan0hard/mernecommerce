import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

import asyncErrorWrapper from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../mongoDB/models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";

// sign Up
const signUp = asyncErrorWrapper(async (req, res, next) => {
	const { name, email, password, avatar } = req.body;
	const myCloud = await cloudinary.uploader.upload(avatar, {
		folder: "avatars",
		width: 150,
		crop: "scale",
	});

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		},
	});

	sendToken(user, 201, res);
});

// Sign In
const signIn = asyncErrorWrapper(async (req, res, next) => {
	const { email, password } = req.body;

	//Checking email & password entered or not
	if (!email || !password) {
		return next(new ErrorHandler("Please enter email & password both", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Incorrect Email or Password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Incorrect Email or Password", 401));
	}

	sendToken(user, 200, res);
});

// sign Out
const signOut = asyncErrorWrapper(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ success: true, message: "Logged Out!" });
});

// Forgot Password
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	// Get Reset password token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/password/reset/${resetToken}`;

	const message = `Your password reset token in :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, Please ignore this email`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Ecommerce password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to  ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset Password
const resetPassword = asyncErrorWrapper(async (req, res, next) => {
	// Creating hashed Token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Reset Password Token is invalid or has been expired",
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Entered Passwords are not matching", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// Profile Details
const getUserDetails = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Update User's Password
const updatePassword = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Old Password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("Passwords are not matching", 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// Update profile - Validators run nahi ho rahe
const updateProfile = asyncErrorWrapper(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	// For Profile picture update we have to implement cloudinary
	if (req.body.avatar !== "") {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;
		await cloudinary.uploader.destroy(imageId);

		const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
			folder: "avatars",
			width: 150,
			crop: "scale",
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Get all users -- Admin
const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get Single User -- Admin
const getUser = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler(`User does not exist with ${req.params.id}`));
	}

	res.status(200).json({ success: true, user });
});

// Update User's Role -- Admin

const updateRole = asyncErrorWrapper(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Delete User -- Admin
const deleteUser = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User deleted Successfully",
	});
});

export {
	signUp,
	signIn,
	signOut,
	forgotPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUsers,
	getUser,
	updateRole,
	deleteUser,
};
