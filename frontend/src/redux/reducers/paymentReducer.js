import {
	FETCH_PAYMENT_REQUEST,
	FETCH_PAYMENT_SUCCESS,
	FETCH_PAYMENT_FAILURE,
} from "../constants/paymentConstants";

const initialState = {
	loading: false,
	orderId: "",
	orderAmount: "",
	error: "",
};

export const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PAYMENT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_PAYMENT_SUCCESS:
			return {
				...state,
				loading: false,
				orderId: action.payload.order.id,
				orderAmount: action.payload.order.amount,
			};
		case FETCH_PAYMENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
