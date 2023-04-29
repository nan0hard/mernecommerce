import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import MetaData from "../../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import Sidebar from "../Sidebar/Sidebar";
import {
	getAdminProducts,
	clearErrors,
	deleteProduct,
} from "../../../redux/actions/productAction";

import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../../redux/constants/productConstants";

const ProductList = () => {
	const dispatch = useDispatch();
	const { error, products } = useSelector((state) => state.products);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.product
	);

	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id));
	};

	const columns = [
		{ field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
		{ field: "name", headerName: "Name", minWidth: 350, flex: 1 },
		{
			field: "stock",
			headerName: "Stock",
			minWidth: 150,
			flex: 0.3,
			type: "number",
		},
		{
			field: "price",
			headerName: "Price",
			minWidth: 270,
			flex: 0.5,
			type: "number",
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
						<Link to={`/admin/product/update/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button onClick={() => deleteProductHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	products &&
		products.forEach((item) => {
			rows.push({
				id: item._id,
				stock: item.stock,
				price: item.price,
				name: item.name,
			});
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Product Deleted Successfully!");
			dispatch({ type: DELETE_PRODUCT_RESET });
		}

		dispatch(getAdminProducts());
	}, [dispatch, error, isDeleted, deleteError]);

	return (
		<>
			<MetaData title={`ALL PRODUCTS - Admin`} />
			<div className="dashboard">
				<Sidebar />
				<div className="productListContainer">
					<h1 id="productListHeading">ALL PRODUCTS</h1>

					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableRowSelectionOnClick
						className="productListTable"
						autoHeight
					/>
				</div>
			</div>
		</>
	);
};

export default ProductList;
