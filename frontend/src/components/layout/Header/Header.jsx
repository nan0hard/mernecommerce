import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { BsSearch, BsFilePerson } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

const options = {
	burgerColorHover: "#A62D24",
	logo,
	logoWidth: "20vmax",
	navColor1: "white",
	logoHoverSize: "10px",
	logoHoverColor: "#EB4034",
	link1Text: "Home",
	link2Text: "Products",
	link3Text: "Contact",
	link4Text: "About",
	link1Url: "/",
	link2Url: "/products",
	link3Url: "/contact",
	link4Url: "/about",
	link1Size: "1.3vmax",
	link1Color: "rgba(35, 35, 35, 0.8)",
	nav1justifyContent: "flex-end",
	nav2justifyContent: "flex-end",
	nav3justifyContent: "flex-start",
	nav4justifyContent: "flex-start",
	link1ColorHover: "#EB4034",
	link1Margin: "1vmax",
	profileIconColor: "rgba(35, 35, 35, 0.8)",
	searchIconColor: "rgba(35, 35, 35, 0.8)",
	cartIconColor: "rgba(35, 35, 35, 0.8)",
	profileIconColorHover: "#EB4034",
	searchIconColorHover: "#EB4034",
	cartIconColorHover: "#EB4034",
	cartIconMargin: "1vmax",
	SearchIconElement: BsSearch,
	searchIcon: true,
	CartIconElement: FiShoppingCart,
	cartIcon: true,
	ProfileIconElement: BsFilePerson,
	profileIcon: true,
	searchIconUrl: "/search",
	cartIconUrl: "/cart",
	profileIconUrl: "/signIn",
};

const Header = () => {
	return <ReactNavbar {...options} />;
};

export default Header;
