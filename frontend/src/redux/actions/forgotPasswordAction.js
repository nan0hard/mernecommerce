import axios from "axios";

import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	CLEAR_ERRORS,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS,
} from "../constants/userConstants";

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(`/api/v1/password/reset`, email, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.put(
			`/api/v1/password/reset/${token}`,
			passwords,
			config
		);

		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.error });
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
