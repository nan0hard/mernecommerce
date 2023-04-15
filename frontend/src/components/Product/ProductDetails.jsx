import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";

import {
	clearErrors,
	getProductDetails,
} from "../../redux/actions/productAction";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import "./ProductDetails.css";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams(); // Used Params Instead of match
	const alert = useAlert();

	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);

	useEffect(() => {
		if (error) {
			toast.error(error);
			// alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(getProductDetails(id));
	}, [dispatch, id, alert, error]);

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1)",
		activeColor: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: product.ratings,
		isHalf: true,
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
								<ReactStars {...options} classNames="review-star" />
								<span>({product.numOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock-3">
								<h1>{`₹ ${product.price}`}</h1>
								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button>-</button>
										<input value="1" type="number" />
										<button>+</button>
									</div>
									{""}
									<button>Add to Cart</button>
								</div>
								<p>Status: ""</p>
								<b className={product.Stock < 1 ? "redColor" : "greenColor"}>
									{product.Stock < 1 ? "Out of Stock" : "In Stock"}
								</b>
							</div>

							<div className="detailsBlock-4">
								Description: <p>{product.description}</p>
							</div>

							<button className="submitReview">Submit Review</button>
						</div>
					</div>

					<h3 className="reviewsHeading">Reviews</h3>
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
