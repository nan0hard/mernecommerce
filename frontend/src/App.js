import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import store from "./store.js";
import FloatingActions from "./components/layout/FloatingActions/FloatingActions.jsx";
import { loadUser } from "./redux/actions/userAction";
import SignInSignUp from "./components/User/SignInSignUp";
import Profile from "./components/User/Profile.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import ProcessPayment from "./components/Cart/ProcessPayment.jsx";
import PaymentSuccess from "./components/Order/PaymentSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	React.useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"],
			},
		});

		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<ToastContainer />
			<Header />
			{isAuthenticated && <FloatingActions user={user} />}
			<Routes>
				<>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:keyword" element={<Products />} />
					<Route path="/search" element={<Search />} />
					<Route path="/signin" element={<SignInSignUp />} />
					<Route
						element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
					>
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/update" element={<UpdateProfile />} />
						<Route path="/password/update" element={<UpdatePassword />} />
						<Route path="/shipping" element={<Shipping />} />
						<Route path="/order/confirm" element={<ConfirmOrder />} />
						<Route path="/process/payment" element={<ProcessPayment />} />
						<Route
							path="/payment/success/:razorpay_order_id"
							element={<PaymentSuccess />}
						/>
						<Route path="/myorders" element={<MyOrders />} />
						<Route path="/myorders/order/:id" element={<OrderDetails />} />
					</Route>

					<Route path="/password/reset" element={<ForgotPassword />} />
					<Route path="/password/reset/:token" element={<ResetPassword />} />
					<Route path="/cart" element={<Cart />} />
				</>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
