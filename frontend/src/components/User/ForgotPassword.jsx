import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import {
	forgotPassword,
	clearErrors,
} from "../../redux/actions/forgotPasswordAction";

import "./ForgotPassword.css";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { loading, error, message } = useSelector(
		(state) => state.forgotPassword
	);
	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();

		myForm.set("email", email);
		dispatch(forgotPassword(myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			toast.success(message);
		}
	}, [dispatch, error, message]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`Forgot Password`} />
					<div className="forgotPasswordContainer">
						<div className="forgotPasswordBox">
							<h2 className="forgotPasswordHeading">Forgot Password?</h2>
							<form
								className="forgotPasswordForm"
								onSubmit={forgotPasswordSubmit}
							>
								<div className="forgotPasswordEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Enter registered email address"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<input
									type="submit"
									value="Send Reset Link"
									className="forgotPasswordBtn"
									disabled={loading ? true : false}
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ForgotPassword;
