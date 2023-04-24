import {
	FETCH_PAYMENT_DETAILS_REQUEST,
	FETCH_PAYMENT_DETAILS_SUCCESS,
	FETCH_PAYMENT_DETAILS_FAIL,
} from "../constants/paymentDetailsConstant";

export const paymentDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_PAYMENT_DETAILS_REQUEST:
			return { loading: true };
		case FETCH_PAYMENT_DETAILS_SUCCESS:
			return { loading: false, payment: action.payload };
		case FETCH_PAYMENT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// import {
// 	FETCH_PAYMENT_DETAILS_REQUEST,
// 	FETCH_PAYMENT_DETAILS_FAIL,
// 	FETCH_PAYMENT_DETAILS_SUCCESS,
// } from "../constants/paymentDetailsConstant";

// export const paymentDetailsReducer = (state = {}, action) => {
// 	switch (action.type) {
// 		case FETCH_PAYMENT_DETAILS_REQUEST:
// 			return {
// 				...state,
// 				loading: true,
// 				error: null,
// 			};
// 		case FETCH_PAYMENT_DETAILS_SUCCESS:
// 			return {
// 				...state,
// 				loading: false,
// 				error: null,
// 				details: action.payload,
// 			};
// 		case FETCH_PAYMENT_DETAILS_FAIL:
// 			return {
// 				...state,
// 				loading: false,
// 				details: null,
// 				error: null,
// 			};

// 		default:
// 			return state;
// 	}
// };
