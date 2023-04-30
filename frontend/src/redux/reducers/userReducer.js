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
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
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

export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case ALL_USERS_FAIL:
			return {
				...state,
				loading: false,
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

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
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
