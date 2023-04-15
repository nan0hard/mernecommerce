import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants.js";

const productReducer = (state = { products: [], failed: false }, action) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
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

		case ALL_PRODUCT_FAIL:
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

const productDetailsReducer = (
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

export { productReducer, productDetailsReducer };
