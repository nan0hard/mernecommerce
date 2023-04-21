import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated }) => {
	const location = useLocation();

	return isAuthenticated ? (
		<Outlet />
	) : (
		<>
			<Navigate to="/signin" state={{ pathname: location.pathname }} replace />
		</>
	);
};

export default ProtectedRoutes;
