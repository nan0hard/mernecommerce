import axios from "axios";

import {
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	CLEAR_ERRORS,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
} from "../constants/profileConstants.js";

// Update profile

export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = { headers: { "Content-Type": "multipart/form-data" } };
		const { data } = await axios.put(
			`/api/v1/profile/update`,
			userData,
			config
		);
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.error,
		});
	}
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.put(
			`/api/v1/password/update`,
			passwords,
			config
		);

		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
