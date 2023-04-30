import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import store from "./store.js";
import FloatingActions from "./components/layout/FloatingActions/FloatingActions";
import { loadUser } from "./redux/actions/userAction";
import SignInSignUp from "./components/User/SignInSignUp";
import Profile from "./components/User/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import ProcessPayment from "./components/Cart/ProcessPayment";
import PaymentSuccess from "./components/Order/PaymentSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";

import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ProductList from "./components/Admin/ProductList/ProductList";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct";
import OrderList from "./components/Admin/OrderList/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder/ProcessOrder";
import UsersList from "./components/Admin/UsersList/UsersList";
import UpdateUser from "./components/Admin/UpdateUser/UpdateUser";

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
						element={
							<ProtectedRoutes
								isAuthenticated={isAuthenticated}
								isAdmin={false}
							/>
						}
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

					<Route
						element={
							<ProtectedRoutes
								isAuthenticated={isAuthenticated}
								isAdmin={true}
							/>
						}
					>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/products" element={<ProductList />} />
						<Route path="/admin/product/create" element={<CreateProduct />} />
						<Route
							path="/admin/product/update/:id"
							element={<UpdateProduct />}
						/>
						<Route path="/admin/orders" element={<OrderList />} />
						<Route path="/admin/order/update/:id" element={<ProcessOrder />} />
						<Route path="/admin/users" element={<UsersList />} />
						<Route path="/admin/user/update/:id" element={<UpdateUser />} />
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
