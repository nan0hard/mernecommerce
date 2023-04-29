import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { makeStyles } from "@mui/styles";

import logo from "../../../images/logo.png";

import "./Sidebar.css";

const useStyles = makeStyles({
	treeViewRoot: {
		backgroundColor: "white",
		"& .MuiTreeItem-content": {
			padding: "2rem",
			fontSize: "1rem",
			fontWeight: 200,
			fontFamily: "Roboto",
			color: "rgba(0, 0, 0, 0.5)",
			textDecoration: "none",
			transition: "all 0.5s",
			"&:hover": {
				color: "tomato",
			},
			"& a": {
				textDecoration: "none",
				color: "inherit",
				"&:hover": {
					textDecoration: "none",
				},
			},
		},
	},
});

const Sidebar = () => {
	const classes = useStyles();
	return (
		<>
			<div className="sidebar">
				<Link to="/">
					<img src={logo} alt="Ecommerce" />
				</Link>
				<Link to={`/admin/dashboard`}>
					<p>
						<DashboardIcon /> Dashboard
					</p>
				</Link>
				{/* <Link> */}
				<TreeView
					className={classes.treeViewRoot}
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ImportExportIcon />}
				>
					<TreeItem nodeId="1" label="Products">
						<Link to={`/admin/products`}>
							<TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
						</Link>
						<Link to={`/admin/product/create`}>
							<TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
						</Link>
					</TreeItem>
				</TreeView>
				{/* </Link> */}
				<Link to={`/admin/orders`}>
					<p>
						<ListAltIcon /> Orders
					</p>
				</Link>
				<Link to={`/admin/users`}>
					<p>
						<PeopleIcon /> Users
					</p>
				</Link>
				<Link to={`/admin/reviews`}>
					<p>
						<RateReviewIcon /> Reviews
					</p>
				</Link>
			</div>
		</>
	);
};

export default Sidebar;
