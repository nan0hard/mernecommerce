import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckOutSteps from "./CheckOutSteps";

import "./ProcessPayment.css";
import { processPayment } from "../../redux/actions/paymentAction";

const ProcessPayment = () => {
	const dispatch = useDispatch();
	const {
		user: { name, email },
	} = useSelector((state) => state.user);

	const {
		shippingInfo: { mobileNo },
	} = useSelector((state) => state.cart);
	const { totalPrice } = JSON.parse(sessionStorage.getItem("orderInfo"));

	const paymentGateway = () => {
		dispatch(processPayment(totalPrice, name, email, mobileNo));
	};

	return (
		<>
			<CheckOutSteps activeStep={2} />
			<div className="division">
				<button
					className="btn"
					onClick={() => paymentGateway(totalPrice)}
				>{`Click To Pay ₹${totalPrice}`}</button>
			</div>
		</>
	);
};

export default ProcessPayment;
