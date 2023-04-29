import axios from "axios";
import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	ADMIN_PRODUCT_REQUEST,
	ADMIN_PRODUCT_SUCCESS,
	ADMIN_PRODUCT_FAIL,
	CREATE_NEW_PRODUCT_REQUEST,
	CREATE_NEW_PRODUCT_SUCCESS,
	CREATE_NEW_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants";

// Get all products
export const getProduct =
	(keyword = "", currentPage = 1, price = [0, 200000], category, ratings = 0) =>
	async (dispatch) => {
		try {
			dispatch({ type: ALL_PRODUCT_REQUEST });

			let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

			if (category) {
				link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
			}

			const { data } = await axios.get(link);
			dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
		} catch (error) {
			// console.log(error);

			dispatch({
				type: ALL_PRODUCT_FAIL,
				payload: error.response.data.error,
			});
		}
	};

// Get all products -- Admin
export const getAdminProducts = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_PRODUCT_REQUEST });
		const { data } = await axios.get("/api/v1/admin/products");

		dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
	} catch (error) {
		dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.response.data.error });
	}
};

// Create new Product --Admin
export const createNewProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_NEW_PRODUCT_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.post(
			`/api/v1/admin/product/new`,
			productData,
			config
		);

		dispatch({ type: CREATE_NEW_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CREATE_NEW_PRODUCT_FAIL,
			payload: error.response.data.error,
		});
	}
};

// Update existing product
export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.put(
			`/api/v1/admin/product/${id}`,
			productData,
			config
		);

		dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: error.response.data.error,
		});
	}
};

// Delete Product --Admin
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

		dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.error,
		});
	}
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/product/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
