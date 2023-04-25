import axios from "axios";

import {
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	CLEAR_ERRORS,
} from "../constants/reviewsConstants";

export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/v1/review`, reviewData, config);

		dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.error });
	}
};

export const clearErrors = async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
