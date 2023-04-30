import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { UPDATE_USER_RESET } from "../../../redux/constants/userConstants";
import Loader from "../../layout/Loader/Loader";
import {
	getUserDetails,
	updateUser,
	clearErrors,
} from "../../../redux/actions/userAction";

import "./UpdateUser.css";

const UpdateUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { loading, error, user } = useSelector((state) => state.userDetails);
	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		if (user && user._id !== id) {
			dispatch(getUserDetails(id));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success(`User Updated Successfully`);
			navigate("/admin/users");
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, error, isUpdated, updateError, id, navigate, user]);

	const updateUserSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = { name, email, role };
		dispatch(updateUser(id, myForm));
	};

	return (
		<>
			<MetaData title="Update User Details" />
			<div className="dashboard">
				<Sidebar />
				<div className="newProductContainer">
					{loading ? (
						<Loader />
					) : (
						<form
							className="createProductForm"
							encType="multipart/form-data"
							onSubmit={updateUserSubmitHandler}
						>
							<h1>Update User Details</h1>

							<div>
								<BadgeIcon />
								<input
									type="text"
									placeholder="Full Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div>
								<EmailIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<VerifiedUserIcon />
								<select value={role} onChange={(e) => setRole(e.target.value)}>
									<option value="">Choose Role</option>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
							</div>

							<Button
								id="createProductBtn"
								type="submit"
								disabled={
									updateLoading ? true : false || role === "" ? true : false
								}
							>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default UpdateUser;
