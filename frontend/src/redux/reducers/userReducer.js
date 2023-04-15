import {
	SIGNIN_REQUEST,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	CLEAR_ERRORS,
	SIGNOUT_FAIL,
	SIGNOUT_SUCCESS,
} from "../constants/userConstants.js";

export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case SIGNIN_REQUEST:
		case SIGNUP_USER_REQUEST:
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case SIGNIN_SUCCESS:
		case SIGNUP_USER_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};

		case SIGNOUT_SUCCESS: {
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
			};
		}

		case SIGNOUT_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}

		case SIGNIN_FAIL:
		case SIGNUP_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
