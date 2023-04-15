import Product from "../mongoDB/models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncErrorWrapper from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";

// Create Product -- Admin
const createProduct = asyncErrorWrapper(async (req, res, next) => {
	const { name, price, description, category, images } = req.body;

	const product = await Product.create({
		name,
		price,
		description,
		category,
		images,
		user: req.user._id,
	});
	res.status(201).json({
		success: true,
		product,
	});
});

// Get All Products
const getAllProducts = asyncErrorWrapper(async (req, res, next) => {
	// return next(new ErrorHandler(`THis is a custom error`, 500));
	const resultPerPage = 8;
	const productsCount = await Product.countDocuments();

	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter();

	let products = await apiFeature.query;
	let filteredProductsCount = products.length;

	apiFeature.pagination(resultPerPage);
	products = await apiFeature.query.clone();

	res.status(200).json({
		success: true,
		products,
		productsCount,
		resultPerPage,
		filteredProductsCount,
	});
});

// Update Product -- Admin
const updateProduct = asyncErrorWrapper(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Delete a Product -- Admin
const deleteProduct = asyncErrorWrapper(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.remove();

	res
		.status(200)
		.json({ success: true, message: "Product deleted successfully" });
});

// Get Product details
const getProductDetails = asyncErrorWrapper(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({ success: true, product });
});

// Create New Review/Update
const createProductReview = asyncErrorWrapper(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString()) {
				(rev.rating = rating), (rev.comment = comment);
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let avg = 0;

	product.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	product.ratings = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

// Get all reviews of a Product
const getProductReviews = asyncErrorWrapper(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new ErrorHandler("Product Not Found!", 404));
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

const deleteReview = asyncErrorWrapper(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	const reviews = product.reviews.filter(
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;

	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	const ratings = avg / reviews.length;
	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

export {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
};
