import express from "express";
const router = express.Router();

import {
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

export default router;
