import express from "express";
const router = express.Router();

import {
	deleteOrder,
	getAllOrders,
	getSingleOrder,
	myOrders,
	newOrder,
	updateOrderStatus,
} from "../controllers/order.controller.js";
import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
	.route("/admin/order/all")
	.get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateOrderStatus)
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

export default router;
