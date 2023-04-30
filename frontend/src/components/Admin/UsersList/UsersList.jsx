import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import MetaData from "../../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Sidebar from "../Sidebar/Sidebar";
import {
	getAllUsers,
	clearErrors,
	deleteUser,
} from "../../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../../redux/constants/userConstants";

import "./UsersList.css";

const UsersList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, users } = useSelector((state) => state.allUsers);
	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector((state) => state.profile);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
		{ field: "email", headerName: "Email", minWidth: 200, flex: 1 },
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 0.5,
		},
		{
			field: "role",
			headerName: "Role",
			minWidth: 150,
			flex: 0.3,
			cellClassName: (params) => {
				return params.row.role === "admin" ? "greenColor" : "redColor";
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 0.3,
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/admin/user/update/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button onClick={() => deleteUserHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	users &&
		users.forEach((item) => {
			rows.push({
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name,
			});
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success(message);
			navigate(`/admin/users`);
			dispatch({ type: DELETE_USER_RESET });
		}

		dispatch(getAllUsers());
	}, [dispatch, error, isDeleted, deleteError, navigate, message]);

	return (
		<>
			<MetaData title={`All Users - Admin`} />
			<div className="dashboard">
				<Sidebar />
				<div className="userListContainer">
					<h1 id="userListHeading">ALL USERS</h1>

					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableRowSelectionOnClick
						className="userListTable"
						autoHeight
					/>
				</div>
			</div>
		</>
	);
};
export default UsersList;
