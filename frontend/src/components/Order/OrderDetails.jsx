import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { clearErrors, getOrderDetails } from "../../redux/actions/orderAction";

import "./OrderDetails.css";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { loading, error, order } = useSelector((state) => state.orderDetails);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(getOrderDetails(id));
	}, [error, id, dispatch]);

	return (
		<>
			<MetaData title={"Order Details"} />
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="orderDetailsPage">
						<div className="orderDetailsContainer">
							<Typography component={"h1"}>
								Order Id: {order && order._id}
							</Typography>
							<Typography>Shipping Info</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p>Name:</p>
									<span>{order?.user && order?.user.name}</span>
								</div>
								<div>
									<p>Mobile No:</p>
									<span>
										{order?.shippingInfo && order?.shippingInfo.mobileNo}
									</span>
								</div>
								<div>
									<p>Address:</p>
									<span>
										{order?.shippingInfo &&
											`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
									</span>
								</div>
							</div>

							<Typography>Payment</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order?.paymentInfo &&
											order?.paymentInfo.status === "captured"
												? "greenColor"
												: "redColor"
										}
									>
										{order?.paymentInfo &&
										order?.paymentInfo.status === "captured"
											? "PAID"
											: "NOT PAID"}
									</p>
								</div>
								<div>
									<p>Amount:</p>
									<span>{order?.totalPrice && order?.totalPrice}</span>
								</div>
							</div>
							<Typography>Order Status</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order?.orderStatus && order?.orderStatus === "Delivered"
												? "greenColor"
												: "redColor"
										}
									>
										{order?.orderStatus && order?.orderStatus}
									</p>
								</div>
							</div>
						</div>

						<div className="orderDetailsCartItems">
							<Typography>Order Items:</Typography>
							<div className="orderDetailsCartItemsContainer">
								{order?.orderItems &&
									order?.orderItems.map((item) => (
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
					</div>
				</>
			)}
		</>
	);
};

export default OrderDetails;
