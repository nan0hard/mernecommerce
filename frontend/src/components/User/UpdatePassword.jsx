import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordIcon from "@mui/icons-material/Password";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Loader from "../layout/Loader/Loader";
import {
	updatePassword,
	clearErrors,
} from "../../redux/actions/profileAction.js";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/profileConstants";
import MetaData from "../layout/MetaData";

import "./UpdatePassword.css";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visibility1, setVisibility1] = useState(false);
	const [visibility2, setVisibility2] = useState(false);
	const [visibility3, setVisibility3] = useState(false);
	const [clicked1, setClicked1] = useState(false);
	const [clicked2, setClicked2] = useState(false);
	const [clicked3, setClicked3] = useState(false);

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("oldPassword", oldPassword);
		myForm.set("newPassword", newPassword);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(updatePassword(myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Password Updated Successfully");
			navigate("/profile");

			dispatch({ type: UPDATE_PASSWORD_RESET });
		}
	}, [dispatch, error, isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`Change Password`} />
					<div className="updatePasswordContainer">
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Change Password</h2>
							<form
								className="updatePasswordForm"
								encType="multipart/form-data"
								onSubmit={updatePasswordSubmit}
							>
								<div className="signInPassword">
									<PasswordIcon />
									<input
										type={visibility1 ? "text" : "password"}
										placeholder="Enter your current Password"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
										onFocus={() => setClicked1(true)}
										onBlur={() => setClicked1(!clicked1)}
									/>
									{oldPassword.length > 0 ? (
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
								<div className="signInPassword">
									<LockOpenIcon />
									<input
										type={visibility2 ? "text" : "password"}
										placeholder="Enter New Password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										onFocus={() => setClicked2(true)}
										onBlur={() => setClicked2(!clicked2)}
									/>
									{newPassword.length > 0 ? (
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
								<div className="signInPassword">
									<LockIcon />
									<input
										type={visibility3 ? "text" : "password"}
										placeholder="Confirm New Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										onFocus={() => setClicked3(true)}
										onBlur={() => setClicked3(!clicked3)}
									/>
									{confirmPassword.length > 0 ? (
										<div
											className="eyeIcon"
											onClick={() => setVisibility3(!visibility3)}
										>
											{visibility3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</div>
									) : (
										<></>
									)}
								</div>
								<input
									type="submit"
									value="Update"
									className="updatePasswordBtn"
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

export default UpdatePassword;
