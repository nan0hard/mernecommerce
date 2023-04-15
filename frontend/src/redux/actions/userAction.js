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

// For clearing existing errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
