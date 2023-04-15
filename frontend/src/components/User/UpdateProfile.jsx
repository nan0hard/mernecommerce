import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../layout/Loader/Loader";
import { loadUser } from "../../redux/actions/userAction";
import {
	updateProfile,
	clearErrors,
} from "../../redux/actions/profileAction.js";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/profileConstants";
import MetaData from "../layout/MetaData";

import "./UpdateProfile.css";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);
		dispatch(updateProfile(myForm));
	};

	const updateProfileDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	useEffect(() => {
		if (user) {
			setName(user?.name);
			setEmail(user?.email);
			setAvatarPreview(user?.avatar?.url);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Profile Updated Successfully");
			dispatch(loadUser());
			navigate("/profile");

			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, error, isUpdated, navigate, user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`Update Profile`} />
					<div className="updateProfileContainer">
						<div className="updateProfileBox">
							<h2 className="updateProfileHeading">Update Your Details</h2>
							<form
								className="updateProfileForm"
								onSubmit={updateProfileSubmit}
							>
								<div className="updateProfileName">
									<FaceRetouchingNaturalIcon />
									<input
										type="text"
										placeholder="Enter a new name"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="updateProfileEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Enter a new email address"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div id="updateProfileImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Update Profile"
									className="updateProfileBtn"
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

export default UpdateProfile;
