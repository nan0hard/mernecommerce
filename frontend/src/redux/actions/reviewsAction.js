import axios from "axios";

import {
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	CLEAR_ERRORS,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	ALL_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
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

// Get All Reviews - Admin
export const getAllReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: ALL_REVIEWS_REQUEST });

		const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

		dispatch({ type: ALL_REVIEWS_SUCCESS, payload: data.reviews });
	} catch (error) {
		dispatch({ type: ALL_REVIEWS_FAIL, payload: error.response.data.error });
	}
};

// Get All Reviews - Admin
export const deleteReview = (reviewId, productId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await axios.delete(
			`/api/v1/reviews?id=${reviewId}&productId=${productId}`
		);

		dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({ type: DELETE_REVIEW_FAIL, payload: error.response.data.error });
	}
};

export const clearErrors = async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
