import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
	{
		razorpay_order_id: {
			type: String,
			required: true,
		},
		razorpay_payment_id: {
			type: String,
			required: true,
		},
		razorpay_signature: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["created", "authorized", "captured", "refunded", "failed"],
			default: "created",
		},
		method: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
