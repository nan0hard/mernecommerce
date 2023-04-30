import axios from "axios";

import {
	SIGNIN_REQUEST,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	CLEAR_ERRORS,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	SIGNOUT_FAIL,
	SIGNOUT_SUCCESS,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
} from "../constants/userConstants.js";

// Sign In
export const signin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: SIGNIN_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			`/api/v1/signin`,
			{ email, password },
			config
		);

		dispatch({ type: SIGNIN_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: SIGNIN_FAIL, payload: error.response.data.error });
	}
};

// Sign Up
export const signup = (userData) => async (dispatch) => {
	try {
		dispatch({ type: SIGNUP_USER_REQUEST });
		const config = { headers: { "Content-Type": "multipart/form-data" } };

		const { data } = await axios.post(`/api/v1/signup`, userData, config);
		dispatch({ type: SIGNUP_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: SIGNUP_USER_FAIL, payload: error.response.data.error });
	}
};

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get(`/api/v1/profile`);

		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error });
	}
};

// SignOut User
export const signOut = () => async (dispatch) => {
	try {
		await axios.get("/api/v1/signout");

		dispatch({ type: SIGNOUT_SUCCESS });
	} catch (error) {
		dispatch({ type: SIGNOUT_FAIL, payload: error.response.data.error });
	}
};

// Get All Users -- Admin
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_USERS_REQUEST });
		const { data } = await axios.get("/api/v1/admin/users");

		dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
	} catch (error) {
		dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.error });
	}
};

// Get User Details -- Admin
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/v1/admin/user/${id}`);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.error });
	}
};

// Update user
export const updateUser = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.put(
			`/api/v1/admin/user/${id}`,
			userData,
			config
		);

		dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: error.response.data.error,
		});
	}
};

// Delete user -- Admin
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

		dispatch({ type: DELETE_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data.error,
		});
	}
};

// For clearing existing errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
