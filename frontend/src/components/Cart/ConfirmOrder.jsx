import React from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import MetaData from "../layout/MetaData";

import "./ConfirmOrder.css";

const ConfirmOrder = () => {
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const subtotal = cartItems.reduce(
		(acc, item) => acc + item.quantity * item.price,
		0
	);

	const shippingCharges = subtotal > 1500 ? 0 : 150;
	const tax = Math.round(subtotal * 0.18);
	const totalPrice = subtotal + shippingCharges + tax;

	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

	const proceedToPayment = () => {
		const data = {
			subtotal,
			shippingCharges,
			tax,
			totalPrice,
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		navigate("/process/payment");
	};

	return (
		<>
			<MetaData title="Confirm Your Order" />
			<CheckOutSteps activeStep={1} />
			<div className="confirmOrderPage">
				<div>
					<div className="confirmShippingArea">
						<Typography>Shipping Info</Typography>

						<div className="confirmShippingAreaBox">
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>

							<div>
								<p>Mobile:</p>
								<span>{shippingInfo.mobileNo}</span>
							</div>

							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>

					<div className="confirmCartItems">
						<Typography>Your Cart Items:</Typography>
						<div className="confirmCartItemsContainer">
							{cartItems &&
								cartItems.map((item) => (
									<div key={item.product}>
										<img src={item.image} alt="Product" />
										<Link to={`/product/${item.product}`}>{item.name}</Link>
										<span>
											{item.quantity} X ₹{item.price} ={" "}
											<b>₹{item.price * item.quantity}</b>
										</span>
									</div>
								))}
						</div>
					</div>
				</div>{" "}
				<div>
					<div className="orderSummary">
						<Typography>Order Summary</Typography>
						<div>
							<div>
								<p>Sub-Total</p>
								<span>₹{subtotal}</span>
							</div>

							<div>
								<p>Shipping Charges:</p>
								<span>₹{shippingCharges}</span>
							</div>

							<div>
								<p>GST Charges:</p>
								<span>₹{tax}</span>
							</div>
						</div>

						<div className="orderSummaryTotal">
							<p>
								<b>Total:</b>
							</p>
							<span>
								<b>₹{totalPrice}</b>
							</span>
						</div>

						<button onClick={proceedToPayment}>Proceed to Payment</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
