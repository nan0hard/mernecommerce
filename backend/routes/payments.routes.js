import express from "express";
const router = express.Router();

import {
	getPaymentDetails,
	getRazorKey,
	paymentVerification,
	processPayment,
} from "../controllers/payments.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

router.route("/getRazorKey").get(isAuthenticatedUser, getRazorKey);
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router
	.route("/payment/verification")
	.post(isAuthenticatedUser, paymentVerification);

router
	.route("/payment/success/:razorpay_order_id")
	.get(isAuthenticatedUser, getPaymentDetails);

export default router;
