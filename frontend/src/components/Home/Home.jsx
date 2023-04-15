import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard.jsx";
import { clearErrors, getProduct } from "../../redux/actions/productAction.js";
import Loader from "../layout/Loader/Loader";

import "./Home.css";

const Home = () => {
	// const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, products, failed } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (error || failed) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, failed]);

	useEffect(() => {
		dispatch(getProduct());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="ECOMMERCE" />
					<div className="banner">
						<p>Welcome to Ecommerce</p>
						<h1>SCROLL TO FIND AMAZING PRODUCTS</h1>
						<a href="#container">
							<button>
								Scroll <CgMouse />
							</button>
						</a>
					</div>
					<h2 className="homeHeading">Featured Products</h2>
					<div className="container" id="container">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
				</Fragment>
			)}
		</>
	);
};

export default Home;
