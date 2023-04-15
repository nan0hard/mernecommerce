import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download App for Android and iOS mobile phone</p>
				<img src={playStore} alt="playstore" />
				<img src={appStore} alt="Appstore" />
			</div>

			<div className="midFooter">
				<h1>ECOMMERCE.</h1>
				<p>Quality & Quantity is our priority</p>

				<p>2023 - &copy; Nanohard</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="http://instagram.com/nan0hard">Instagram</a>
				<a href="http://youtube.com/@nanohard">Youtube</a>
				<a href="http://twitter.com/nan0hard">Twitter</a>
			</div>
		</footer>
	);
};

export default Footer;
