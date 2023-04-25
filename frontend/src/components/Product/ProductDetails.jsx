import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Rating,
} from "@mui/material";

import {
	clearErrors,
	getProductDetails,
} from "../../redux/actions/productAction";
import { newReview } from "../../redux/actions/reviewsAction";
import { addItemsToCart } from "../../redux/actions/cartAction";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import "./ProductDetails.css";
import { NEW_REVIEW_RESET } from "../../redux/constants/reviewsConstants";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams(); // Used Params Instead of match

	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);

	const { success, error: reviewError } = useSelector(
		(state) => state.newReview
	);

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const increaseQuantity = () => {
		if (product.stock <= quantity) return;

		const quant = quantity + 1;
		setQuantity(quant);
	};

	const decreaseQuantity = () => {
		if (1 >= quantity) return;

		const quant = quantity - 1;
		setQuantity(quant);
	};

	const addToCartHandler = () => {
		dispatch(addItemsToCart(id, quantity));
		toast.info(`Item Added to Cart`);
	};

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	const reviewSubmitHandler = () => {
		const form = new FormData();

		form.set("rating", rating);
		form.set("comment", comment);
		form.set("productId", id);

		dispatch(newReview(form));
		setOpen(false);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (reviewError) {
			toast.error(reviewError);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success("Review Submitted successfully");
			dispatch({ type: NEW_REVIEW_RESET });
		}

		dispatch(getProductDetails(id));
	}, [dispatch, id, error, reviewError, success]);

	const options = {
		size: "large",
		value: product.ratings,
		readOnly: true,
		precision: 0.5,
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`${product.name} -- ECOMMERCE.`} />
					<div className="ProductDetails">
						<div>
							<Carousel>
								{product.images &&
									product.images.map((item, i) => (
										<img
											className="CarouselImage"
											key={item.url}
											src={item.url}
											alt={`${i} Slide`}
										/>
									))}
							</Carousel>
						</div>

						<div>
							<div className="detailsBlock-1">
								<h2>{product.name}</h2>
								<p>Product # {product._id}</p>
							</div>
							<div className="detailsBlock-2">
								<Rating {...options} classNames="review-star" />
								<span className="detailsBlock-2-span">
									({product.numOfReviews} Reviews)
								</span>
							</div>
							<div className="detailsBlock-3">
								<h1>{`₹ ${product.price}`}</h1>
								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button onClick={decreaseQuantity}>-</button>
										<input value={quantity} type="number" readOnly />
										<button onClick={increaseQuantity}>+</button>
									</div>
									<button
										disabled={product.stock < 1 ? true : false}
										onClick={addToCartHandler}
									>
										Add to Cart
									</button>
								</div>
								<p>Status:</p>
								<b className={product.stock < 1 ? "redColor" : "greenColor"}>
									{product.stock < 1 ? "Out of Stock" : "In Stock"}
								</b>
							</div>

							<div className="detailsBlock-4">
								Description: <p>{product.description}</p>
							</div>

							<button onClick={submitReviewToggle} className="submitReview">
								Submit Review
							</button>
						</div>
					</div>

					<h3 className="reviewsHeading">Reviews</h3>

					<Dialog
						aria-labelledby="simple-dialog-title"
						open={open}
						onClose={submitReviewToggle}
					>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submitDialog">
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={rating}
								size="large"
							/>
							<textarea
								className="submitDialogTextArea"
								cols={"30"}
								rows={"5"}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</DialogContent>
						<DialogActions>
							<Button onClick={submitReviewToggle} color="secondary">
								Cancel
							</Button>
							<Button color="primary" onClick={reviewSubmitHandler}>
								Submit
							</Button>
						</DialogActions>
					</Dialog>

					{product.reviews && product.reviews[0] ? (
						<div className="reviews">
							{product.reviews &&
								product.reviews.map((review) => <ReviewCard review={review} />)}
						</div>
					) : (
						<p className="noReviews">Be the first one to Review this Product</p>
					)}
				</>
			)}
		</>
	);
};

export default ProductDetails;
