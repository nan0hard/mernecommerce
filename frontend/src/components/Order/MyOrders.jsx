import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, myOrders } from "../../redux/actions/orderAction";
import { Link } from "react-router-dom";

import "./MyOrders.css";

const MyOrders = () => {
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.myOrders);
	const { user } = useSelector((state) => state.user);

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
			flex: 0.3,
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
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Link to={`/myorders/order/${params.row.id}`}>
						<LocalMallIcon />
					</Link>
				);
			},
		},
	];
	const rows = [];

	orders &&
		orders.forEach((item, index) => {
			rows.push({
				itemsQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice,
			});
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(myOrders());
	}, [dispatch, error]);

	return (
		<>
			<MetaData title={`${user.name} - Order`} />

			{loading ? (
				<Loader />
			) : (
				<>
					<div className="myOrdersPage">
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableSelectionOnClick
							// disableRowSelectionOnClick
							className="myOrdersTable"
							autoHeight
						/>
						<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
					</div>
				</>
			)}
		</>
	);
};

export default MyOrders;
