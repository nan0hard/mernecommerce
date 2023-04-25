import {
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_RESET,
	NEW_REVIEW_SUCCESS,
	CLEAR_ERRORS,
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
