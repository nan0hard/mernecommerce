import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import CartItemCard from "./CartItemCard.jsx";
import {
	addItemsToCart,
	removeItemsFromCart,
} from "../../redux/actions/cartAction.js";

import "./Cart.css";

const Cart = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQty = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) return;

		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQty = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) return;

		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<RemoveShoppingCartIcon />
					<Typography>Uh-Oh! Your Cart is Empty!</Typography>
					<Link to="/products">View Products</Link>
				</div>
			) : (
				<>
					<div className="cartPage">
						<div className="cartHeader">
							<p>Product</p>
							<p>Quantity</p>
							<p>Sub-Total</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className="cartContainer" key={item.product}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											onClick={() => decreaseQty(item.product, item.quantity)}
										>
											-
										</button>
										<input type="number" readOnly value={item.quantity} />
										<button
											onClick={() =>
												increaseQty(item.product, item.quantity, item.stock)
											}
										>
											+
										</button>
									</div>
									<p className="cartSubTotal">
										{" "}
										{`₹${item.price * item.quantity}`}
									</p>
								</div>
							))}

						<div className="cartGrossTotal">
							<div></div>
							<div className="cartGrossTotalBox">
								<p>Gross Total</p>
								<p>{`₹${cartItems.reduce(
									(acc, item) => acc + item.quantity * item.price,
									0
								)}`}</p>
							</div>
							<div></div>
							<div className="checkOutBtn">
								<button>Check Out</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
