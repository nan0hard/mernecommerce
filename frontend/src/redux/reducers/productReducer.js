import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	ADMIN_PRODUCT_REQUEST,
	ADMIN_PRODUCT_FAIL,
	ADMIN_PRODUCT_SUCCESS,
	CREATE_NEW_PRODUCT_REQUEST,
	CREATE_NEW_PRODUCT_SUCCESS,
	CREATE_NEW_PRODUCT_FAIL,
	CREATE_NEW_PRODUCT_RESET,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_RESET,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_RESET,
} from "../constants/productConstants.js";

export const productsReducer = (
	state = { products: [], failed: false },
	action
) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
		case ADMIN_PRODUCT_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case ALL_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				productsCount: action.payload.productsCount,
				resultPerPage: action.payload.resultPerPage,
				filteredProductsCount: action.payload.filteredProductsCount,
				failed: false,
			};

		case ADMIN_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};

		case ALL_PRODUCT_FAIL:
		case ADMIN_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
				failed: true,
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

export const productDetailsReducer = (
	state = { product: {}, failed: false },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
				failed: false,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
				failed: true,
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

export const createProductReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case CREATE_NEW_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case CREATE_NEW_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				product: action.payload.product,
			};

		case CREATE_NEW_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CREATE_NEW_PRODUCT_RESET:
			return {
				...state,
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

// Delete a Product
export const productReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_PRODUCT_FAIL:
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false,
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

// Update existing product
