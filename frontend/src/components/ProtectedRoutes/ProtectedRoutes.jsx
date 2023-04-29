import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ isAuthenticated, isAdmin }) => {
	const location = useLocation();
	const { user } = useSelector((state) => state.user);

	if (isAuthenticated) {
		if (isAdmin && user.role !== "admin") {
			return <Navigate to="/profile" />;
		} else {
			return <Outlet />;
		}
	} else {
		return (
			<>
				<Navigate
					to="/signin"
					state={{ pathname: location.pathname }}
					replace
				/>
			</>
		);
	}
};

export default ProtectedRoutes;
