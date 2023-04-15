import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { clearErrors, signin, signup } from "../../redux/actions/userAction.js";
import Loader from "../layout/Loader/Loader";

import "./SignInSignUp.css";

const SignInSignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const signInTab = useRef(null);
	const signUpTab = useRef(null);
	const switcherTab = useRef(null);

	const [signInEmail, setSignInEmail] = useState("");
	const [signInPassword, setSignInPassword] = useState("");
	const [visibility, setVisibility] = useState(false);
	const [clicked, setClicked] = useState(false);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const signInSubmit = (e) => {
		e.preventDefault();
		dispatch(signin(signInEmail, signInPassword));
	};

	const signUpSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);
		dispatch(signup(myForm));
	};

	const signUpDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [dispatch, error, isAuthenticated, navigate]);

	const switchTabs = (e, tab) => {
		if (tab === "signIn") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			signUpTab.current.classList.remove("shiftToNeutralForm");
			signInTab.current.classList.remove("shiftToLeft");
		}

		if (tab === "signUp") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			signUpTab.current.classList.add("shiftToNeutralForm");
			signInTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="SignInSignUpContainer">
						<div className="SignInSignUpBox">
							<div>
								<div className="signIn_signUp_toggle">
									<p onClick={(e) => switchTabs(e, "signIn")}>SIGN IN</p>
									<p onClick={(e) => switchTabs(e, "signUp")}>SIGN UP</p>
								</div>
								<button ref={switcherTab}></button>
							</div>
							<form
								className="signInForm"
								ref={signInTab}
								onSubmit={signInSubmit}
							>
								<div className="signInEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Enter your Email"
										required
										value={signInEmail}
										onChange={(e) => setSignInEmail(e.target.value)}
									/>
								</div>

								<div className="signInPassword">
									<PasswordIcon />
									<input
										type="password"
										placeholder="Enter your Password"
										required
										value={signInPassword}
										onChange={(e) => setSignInPassword(e.target.value)}
									/>
								</div>
								<Link to="/password/reset">Forgot Password?</Link>
								<input type="submit" value="SignIn" className="signInBtn" />
							</form>

							<form
								className="signUpForm"
								ref={signUpTab}
								encType="multipart/form-data"
								onSubmit={signUpSubmit}
							>
								<div className="signUpName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Enter your full name"
										required
										name="name"
										value={name}
										onChange={signUpDataChange}
									/>
								</div>
								<div className="signUpEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Enter your Email"
										required
										name="email"
										value={email}
										onChange={signUpDataChange}
									/>
								</div>
								<div className="signUpPassword">
									<PasswordIcon />
									<input
										type={visibility ? "text" : "password"}
										placeholder="Enter your Password"
										required
										name="password"
										value={password}
										onChange={signUpDataChange}
										onFocus={() => setClicked(true)}
										onBlur={() => setClicked(!clicked)}
									/>
									{password.length > 0 ? (
										<div
											className="eyeIcon"
											onClick={() => setVisibility(!visibility)}
										>
											{visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</div>
									) : (
										<></>
									)}
								</div>

								<div id="signUpImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={signUpDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Sign Up"
									className="signUpBtn"
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

export default SignInSignUp;
