import axios from "axios";
import {
	FETCH_PAYMENT_DETAILS_REQUEST,
	FETCH_PAYMENT_DETAILS_SUCCESS,
	FETCH_PAYMENT_DETAILS_FAIL,
} from "../constants/paymentDetailsConstant";

export const getPaymentDetails = (razorpay_order_id) => async (dispatch) => {
	try {
		dispatch({ type: FETCH_PAYMENT_DETAILS_REQUEST });

		const { data } = await axios.get(
			`/api/v1/payment/success/${razorpay_order_id}`
		);

		dispatch({
			type: FETCH_PAYMENT_DETAILS_SUCCESS,
			payload: data.payment,
		});

		return data.payment;
	} catch (error) {
		dispatch({
			type: FETCH_PAYMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});

		return error;
	}
};

// import axios from "axios";
// import {
// 	FETCH_PAYMENT_DETAILS_FAIL,
// 	FETCH_PAYMENT_DETAILS_REQUEST,
// 	FETCH_PAYMENT_DETAILS_SUCCESS,
// } from "../constants/paymentDetailsConstant";

// export const getPaymentDetails = (orderId) => async (dispatch) => {
// 	try {
// 		dispatch({ type: FETCH_PAYMENT_DETAILS_REQUEST });

// 		const { data } = await axios.get(`api/v1/fetch/payment/${orderId}`);
// 		dispatch({ type: FETCH_PAYMENT_DETAILS_SUCCESS, payload: data });
// 	} catch (error) {
// 		dispatch({
// 			type: FETCH_PAYMENT_DETAILS_FAIL,
// 			payload: error.response.data.message,
// 		});
// 	}
// };
