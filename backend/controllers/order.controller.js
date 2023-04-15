import Order from "../mongoDB/models/orderModel.js";
import Product from "../mongoDB/models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncErrorWrapper from "../middleware/catchAsyncErrors.js";

// Creating new Order
const newOrder = asyncErrorWrapper(async (req, res) => {
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	const order = await Order.create({
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt: Date.now(),
		user: req.user._id,
	});

	res.status(201).json({
		success: true,
		order,
	});
});

// Get Single Order details

const getSingleOrder = asyncErrorWrapper(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (!order) {
		return next(
			new ErrorHandler(
				`Order does not exist with orderId: ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// Get logged in user orders
const myOrders = asyncErrorWrapper(async (req, res, next) => {
	const orders = await Order.find({
		user: req.user._id,
	});

	res.status(200).json({
		success: true,
		orders,
	});
});

// Get all Orders -- Admin
const getAllOrders = asyncErrorWrapper(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;
	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		orders,
		totalAmount,
	});
});

// Update Order status -- Admin
const updateOrderStatus = asyncErrorWrapper(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(
			new ErrorHandler(
				`Order not found for given order id: ${req.params.id}`,
				404
			)
		);
	}

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler(`Order already delivered`, 404));
	}

	order.orderItems.forEach(async (ord) => {
		await updateStock(ord.product, ord.quantity);
	});

	order.orderStatus = req.body.status;

	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		message: `Order status changed to ${req.body.status}`,
	});
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	product.stock -= quantity;
	await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin
const deleteOrder = asyncErrorWrapper(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(
			new ErrorHandler(
				`Order not found for given order id: ${req.params.id}`,
				404
			)
		);
	}

	await order.remove();

	res.status(200).json({
		success: true,
		message: `Order Successfully Deleted`,
	});
});

export {
	newOrder,
	getSingleOrder,
	myOrders,
	getAllOrders,
	updateOrderStatus,
	deleteOrder,
};
