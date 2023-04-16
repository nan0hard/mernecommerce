import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";

import { signOut } from "../../../redux/actions/userAction";

import "./FloatingActions.css";

const FloatingActions = ({ user }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const { cartItems } = useSelector((state) => state.cart);

	const options = [
		{ icon: <PersonIcon />, name: "Profile", func: profile },
		{
			icon: (
				<ShoppingCartIcon
					style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
				/>
			),
			name: `Cart(${cartItems.length})`,
			func: cart,
		},
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <LogoutIcon />, name: "Logout", func: logOutUser },
	];

	if (user.role === "admin") {
		options.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function dashboard() {
		navigate("/dashboard");
	}

	function profile() {
		navigate("/profile");
	}

	function orders() {
		navigate("/orders");
	}

	function cart() {
		navigate("/cart");
	}

	function logOutUser() {
		dispatch(signOut());
		toast.success(`${user.name} logged out Successfully!`);
	}

	return (
		<>
			<Backdrop style={{ zIndex: "10" }} open={open} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				style={{ zIndex: "12" }}
				icon={
					<img
						className="speedDialIcon"
						src={user.avatar.url ? user.avatar.url : "/Profile.png"}
						alt="Profile"
					/>
				}
				direction="down"
				className="speedDial"
			>
				{options.map((item) => (
					<SpeedDialAction
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
						key={item.name}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default FloatingActions;
