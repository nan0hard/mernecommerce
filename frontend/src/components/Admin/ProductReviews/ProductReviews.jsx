import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import MetaData from "../../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Star from "@mui/icons-material/Star";

import Sidebar from "../Sidebar/Sidebar";
import {
	getAllReviews,
	deleteReview,
	clearErrors,
} from "../../../redux/actions/reviewsAction";
import { DELETE_REVIEW_RESET } from "../../../redux/constants/reviewsConstants";

import "./ProductReviews.css";

const ProductReviews = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.review
	);
	const { error, reviews, loading } = useSelector(
		(state) => state.productReviews
	);

	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReview(reviewId, productId));
	};

	const productReviewSubmitHandler = (e) => {
		e.preventDefault();

		dispatch(getAllReviews(productId));
	};

	const [productId, setProductId] = useState("");

	const columns = [
		{ field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
		{ field: "user", headerName: "User", minWidth: 150, flex: 0.6 },
		{
			field: "comment",
			headerName: "Comment",
			minWidth: 350,
			flex: 1,
		},
		{
			field: "rating",
			headerName: "Rating",
			minWidth: 180,
			flex: 0.4,
			type: "number",
			cellClassName: (params) => {
				return params.row.rating >= 3 ? "greenColor" : "redColor";
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 0.3,
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Button onClick={() => deleteReviewHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	reviews &&
		reviews.forEach((item) => {
			rows.push({
				id: item._id,
				rating: item.rating,
				comment: item.comment,
				user: item.name,
			});
		});

	useEffect(() => {
		if (productId.length === 24) {
			dispatch(getAllReviews(productId));
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Review Deleted Successfully!");
			navigate("/admin/reviews");
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, error, isDeleted, deleteError, navigate, productId]);

	return (
		<>
			<MetaData title={`ALL REVIEWS - Admin`} />
			<div className="dashboard">
				<Sidebar />
				<div className="productReviewContainer">
					<form
						className="productReviewForm"
						encType="multipart/form-data"
						onSubmit={productReviewSubmitHandler}
					>
						<h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

						<div>
							<Star />
							<input
								type="text"
								placeholder="Product ID"
								required
								value={productId}
								onChange={(e) => setProductId(e.target.value)}
							/>
						</div>

						<Button
							id="createProductBtn"
							type="submit"
							disabled={
								loading ? true : false || productId === "" ? true : false
							}
						>
							Search
						</Button>
					</form>

					{reviews && reviews.length > 0 ? (
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableRowSelectionOnClick
							className="productListTable"
							autoHeight
						/>
					) : (
						<h1 className="productReviewsFormHeading">No Reviews Found</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductReviews;
