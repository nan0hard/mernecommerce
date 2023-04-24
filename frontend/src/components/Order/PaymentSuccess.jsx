import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getPaymentDetails } from "../../redux/actions/paymentDetailsAction";
import { createOrder } from "../../redux/actions/orderAction";
import Loader from "../layout/Loader/Loader";

import "./PaymentSuccess.css";

const PaymentSuccess = () => {
	const { razorpay_order_id } = useParams();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.paymentDetails);
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const fetchPaymentDetails = async () => {
		return dispatch(getPaymentDetails(razorpay_order_id));
	};

	useEffect(() => {
		fetchPaymentDetails().then((resolve) => {
			if (resolve && resolve?.razorpay_payment_id) {
				const order = {
					shippingInfo,
					orderItems: cartItems,
					itemsPrice: orderInfo.subtotal,
					taxPrice: orderInfo.tax,
					shippingPrice: orderInfo.shippingCharges,
					totalPrice: orderInfo.totalPrice,
					paymentInfo: {
						order_id: razorpay_order_id,
						payment_id: resolve?.razorpay_payment_id,
						status: resolve?.status,
					},
				};

				dispatch(createOrder(order));
			}
		});
	}, [
		dispatch,
		razorpay_order_id,
		shippingInfo,
		cartItems,
		orderInfo.subtotal,
		orderInfo.tax,
		orderInfo.shippingCharges,
		orderInfo.totalPrice,
	]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="orderSuccess">
						<CheckCircleIcon />

						<Typography>Your Order has been placed successfully</Typography>
						<span>Your Order ID: {razorpay_order_id}</span>
						<Link to={`/myorders`}>View Orders</Link>
					</div>
				</>
			)}
		</>
	);
};

export default PaymentSuccess;
