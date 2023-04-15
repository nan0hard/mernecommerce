import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productDetailsReducer,
	productReducer,
} from "./redux/reducers/productReducer.js";
import { userReducer } from "./redux/reducers/userReducer.js";
import { profileReducer } from "./redux/reducers/profileReducer.js";
import { forgotPasswordReducer } from "./redux/reducers/forgotPasswordReducer.js";

const reducer = combineReducers({
	products: productReducer,
	productDetails: productDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
});

let initalState = {};

const mdiddleware = [thunk];

const store = createStore(
	reducer,
	initalState,
	composeWithDevTools(applyMiddleware(...mdiddleware))
);

export default store;
