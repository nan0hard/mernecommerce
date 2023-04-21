import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckOutSteps.jsx";
import { saveShippingInfo } from "../../redux/actions/cartAction";

import "./Shipping.css";

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [state, setState] = useState(shippingInfo.state);
	const [country, setCountry] = useState(shippingInfo.country);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [mobileNo, setMobileNo] = useState(shippingInfo.mobileNo);

	const shippingSubmit = (e) => {
		e.preventDefault();

		if (mobileNo.length !== 10) {
			toast.warning("Mobile Number should be 10 digits");
			return;
		}

		dispatch(
			saveShippingInfo({ address, city, state, country, pinCode, mobileNo })
		);

		navigate("/order/confirm");
	};

	return (
		<>
			<MetaData title={`Shipping Details`} />

			<CheckoutSteps activeStep={0} />

			<div className="shippingConatiner">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>

						<div>
							<LocationOnIcon />
							<input
								type="number"
								placeholder="Pincode"
								required
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
							/>
						</div>

						<div>
							<PhoneIphoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								required
								value={mobileNo}
								onChange={(e) => setMobileNo(e.target.value)}
								size={10}
							/>
						</div>

						<div>
							<PublicIcon />
							<select
								required
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((country) => (
										<option key={country.isoCode} value={country.isoCode}>
											{country.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />
								<select
									required
									value={state}
									onChange={(e) => setState(e.target.value)}
								>
									<option value={""}>State</option>
									{State &&
										State.getStatesOfCountry(country).map((state) => (
											<option key={state.isoCode} value={state.isoCode}>
												{state.name}
											</option>
										))}
								</select>
							</div>
						)}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disable={state ? "false" : "true"}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
