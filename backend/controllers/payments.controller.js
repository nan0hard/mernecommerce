import crypto from "crypto";

import { instance } from "../server.js";
import asyncErrorWrapper from "../middleware/catchAsyncErrors.js";
import Payment from "../mongoDB/models/paymentModel.js";
import ErrorHandler from "../utils/errorHandler.js";

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
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;

		const body = razorpay_order_id + "|" + razorpay_payment_id;

		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
			.update(body.toString())
			.digest("hex");

		const isAuthentic = expectedSignature === razorpay_signature;

		if (!isAuthentic) {
			res.status(400).json({
				success: false,
				message: "Payment verification failed",
			});
		}

		// Fetching the details of a payment.
		const payment = await instance.payments.fetch(razorpay_payment_id);

		await Payment.create({
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			user: req.user._id,
			amount: payment.amount,
			status: payment.status,
			method: payment.method,
			email: payment.email,
			contact: payment.contact,
		});

		const details = await Payment.findOne({ razorpay_order_id });

		// res.status(200).json({ success: true, details });
		res.redirect(`/payment/success/${razorpay_order_id}`);
	} catch (error) {
		console.log(error);
		res.redirect(`/payment/failure`);
	}

	// if (isAuthentic) {
	// 	// If Payment is authentic storic is DB
	// 	await Payment.create({
	// 		razorpay_order_id,
	// 		razorpay_payment_id,
	// 		razorpay_signature,
	// 	});

	// 	res.redirect(`/payment/success?reference=${razorpay_payment_id}`);
	// } else {
	// 	res.status(400).json({
	// 		success: false,
	// 	});
	// }
});

export const getPaymentDetails = asyncErrorWrapper(async (req, res) => {
	const { razorpay_order_id } = req.params;

	try {
		const payment = await Payment.findOne({ razorpay_order_id });
		console.log(payment);

		if (!payment) {
			return next(new ErrorHandler("Payment Details Not Found", 404));
		}
		res.status(200).json({ success: true, payment });
	} catch (error) {
		console.error(error);
		res.json({ success: false, error: error });
	}
});

export const getRazorKey = asyncErrorWrapper(async (req, res) => {
	res.status(200).json({
		key: process.env.RAZORPAY_API_KEY,
	});
});
