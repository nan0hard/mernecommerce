import crypto from "crypto";

import { instance } from "../server.js";
import asyncErrorWrapper from "../middleware/catchAsyncErrors.js";
import Payment from "../mongoDB/models/paymentModel.js";

export const processPayment = asyncErrorWrapper(async (req, res, next) => {
	const options = {
		amount: Number(req.body.amount * 100), // amount in the smallest currency unit
		currency: "INR",
	};
	const order = await instance.orders.create(options);
	console.log(order);

	res.status(200).json({
		success: true,
		order,
	});
});

export const paymentVerification = asyncErrorWrapper(async (req, res, next) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;

	const body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
		.update(body.toString())
		.digest("hex");

	const isAuthentic = expectedSignature === razorpay_signature;

	if (isAuthentic) {
		// If Payment is authentic storic is DB
		await Payment.create({
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
		});

		res.redirect(`/payment/success?reference=${razorpay_payment_id}`);
	} else {
		res.status(400).json({
			success: false,
		});
	}
});

export const getRazorKey = asyncErrorWrapper(async (req, res) => {
	res.status(200).json({
		key: process.env.RAZORPAY_API_KEY,
	});
});
