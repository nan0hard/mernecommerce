import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {
	clearErrors,
	resetPassword,
} from "../../redux/actions/forgotPasswordAction";

import "./ResetPassword.css";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, success } = useSelector(
		(state) => state.forgotPassword
	);

	const { token } = useParams();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [clicked1, setClicked1] = useState(false);
	const [visibility1, setVisibility1] = useState(false);
	const [clicked2, setClicked2] = useState(false);
	const [visibility2, setVisibility2] = useState(false);

	const resetPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("password", password);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(resetPassword(token, myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success("Password reset Successfully");
			navigate("/signin");
		}
	}, [dispatch, error, navigate, success]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`Reset Password`} />
					<div className="resetPasswordContainer">
						<div className="resetPasswordBox">
							<h2 className="resetPasswordHeading">Reset Password</h2>
							<form
								className="resetPasswordForm"
								encType="multipart/form-data"
								onSubmit={resetPasswordSubmit}
							>
								<div>
									<LockOpenIcon />
									<input
										type={visibility1 ? "text" : "password"}
										placeholder="Enter New Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										onFocus={() => setClicked1(true)}
										onBlur={() => setClicked1(!clicked1)}
									/>
									{password.length > 0 ? (
										<div
											className="eyeIcon"
											onClick={() => setVisibility1(!visibility1)}
										>
											{visibility1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</div>
									) : (
										<></>
									)}
								</div>
								<div>
									<LockIcon />
									<input
										type={visibility2 ? "text" : "password"}
										placeholder="Confirm New Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										onFocus={() => setClicked2(true)}
										onBlur={() => setClicked2(!clicked2)}
									/>
									{confirmPassword.length > 0 ? (
										<div
											className="eyeIcon"
											onClick={() => setVisibility2(!visibility2)}
										>
											{visibility2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</div>
									) : (
										<></>
									)}
								</div>
								<input
									type="submit"
									value="Reset Password"
									className="resetPasswordBtn"
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

export default ResetPassword;
