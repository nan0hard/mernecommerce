import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter Your Name"],
		maxLength: [30, "Name cannot exceed 30 characters"],
		minLength: [4, "Name should be atleast of 4 characters"],
	},

	email: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		validate: [validator.isEmail, "Please Enter a valid email address"],
	},

	password: {
		type: String,
		required: [true, "Please Enter Your Password"],
		maxLength: [20, "Password cannot exceed 20 characters"],
		minLength: [8, "Password should be atleast of 8 characters"],
		select: false,
	},

	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	role: {
		type: String,
		default: "user",
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 11);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

//Generating Password resent Token
userSchema.methods.getResetPasswordToken = function () {
	// Generating Token
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hashing and adding to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
