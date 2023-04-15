import express from "express";
const router = express.Router();

import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";

import {
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
} from "../controllers/user.controller.js";

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/signout").get(signOut);

router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizedRoles("admin"), getUser)
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateRole)
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

export default router;
