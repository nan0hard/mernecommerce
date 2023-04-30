import {
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_RESET,
	NEW_REVIEW_SUCCESS,
	CLEAR_ERRORS,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	ALL_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_RESET,
} from "../constants/reviewsConstants";

export const newReviewReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};

		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};

		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				...state,
				loading: false,
				success: false,
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

// All Reviews - Admin

export const productReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case ALL_REVIEWS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ALL_REVIEWS_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			};

		case ALL_REVIEWS_FAIL:
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

// Delete Product Reviews -- Admin
export const reviewReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_REVIEW_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};

		case DELETE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false,
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
