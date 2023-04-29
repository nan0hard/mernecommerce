import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../Sidebar/Sidebar.jsx";
import { getAdminProducts } from "../../../redux/actions/productAction.js";

import "./Dashboard.css";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);

	let outOfStock = 0;

	products &&
		products.forEach((item) => {
			if (item.stock === 0) {
				outOfStock++;
			}
		});

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, 5000],
			},
		],
	};

	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				backgroundColor: ["#000A684", "#6800B4"],
				hoverBackgroundColor: ["#4B5000", "#35014F"],
				data: [outOfStock, products.length - outOfStock],
			},
		],
	};

	return (
		<>
			<div className="dashboard">
				<Sidebar />
				<div className="dashboardContainer">
					<Typography component={"h1"}>Dashboard</Typography>
					<div className="dashboardSummary">
						<div>
							<p>
								Total Amount
								<br /> $2000
							</p>
						</div>
						<div className="dashboardSummaryBox2">
							<Link to="/admin/products">
								<p>Product</p>
								<p>{products && products.length}</p>
							</Link>
							<Link to="/admin/orders">
								<p>Orders</p>
								<p>4</p>
							</Link>
							<Link to="/admin/users">
								<p>Users</p>
								<p>4</p>
							</Link>
						</div>
					</div>
					<div className="charts">
						<div className="lineChart">
							<Line data={lineState} />
						</div>
						<div className="doughnutChart">
							<Doughnut data={doughnutState} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;