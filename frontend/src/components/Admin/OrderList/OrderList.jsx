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
	getAllOrders,
	clearErrors,
	deleteOrder,
} from "../../../redux/actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../../redux/constants/orderConstants";

import "./OrderList.css";

const OrderList = () => {
	const dispatch = useDispatch();
	const { error, orders } = useSelector((state) => state.allOrders);
	const { error: deleteError, isDeleted } = useSelector((state) => state.order);

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
	};

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.row.status === "Delivered" ? "greenColor" : "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Quantity",
			minWidth: 150,
			type: "number",
			flex: 0.4,
		},
		{
			field: "amount",
			headerName: "Amount",
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
						<Link to={`/admin/order/update/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button onClick={() => deleteOrderHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
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
			toast.success("Order Deleted Successfully!");
			dispatch({ type: DELETE_ORDERS_RESET });
		}

		dispatch(getAllOrders());
	}, [dispatch, error, isDeleted, deleteError]);

	return (
		<>
			<MetaData title={`ALL ORDERS - Admin`} />
			<div className="dashboard">
				<Sidebar />
				<div className="orderListContainer">
					<h1 id="orderListHeading">ALL ORDERS</h1>

					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableRowSelectionOnClick
						className="orderListTable"
						autoHeight
					/>
				</div>
			</div>
		</>
	);
};

export default OrderList;
