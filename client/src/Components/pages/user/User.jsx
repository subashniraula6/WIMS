import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./user.css";

export default function User() {
	const columns = [
		{ field: "id", headerName: "ID", width: 100 },
		{
			field: "firstName",
			headerName: "First name",
			width: 150,
			editable: true,
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 150,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			editable: true,
		},
		{
			field: "designation",
			headerName: "Designation",
			type: "text",
			width: 130,
			editable: true,
		},
		{
			field: "action",
			headerName: "Action",
			width: 160,
			renderCell: (params) => {
				return (
					<>
						<button className="userListEdit">Edit</button>
						<DeleteOutline className="userListDelete" />
					</>
				);
			},
		},
	];

	const rows = [
		{
			id: 1,
			firstName: "Subin",
			lastName: "Maharjan",
			email: "subinmaharjan01@gmail.com",
			designation: "Engineer",
			action: "Approved",
		},
		{
			id: 2,
			firstName: "Subin",
			lastName: "Maharjan",
			email: "subinmaharjan01@gmail.com",
			designation: "Engineer",
			action: "Approved",
		},
		{
			id: 3,
			firstName: "Subin",
			lastName: "Maharjan",
			email: "subinmaharjan01@gmail.com",
			designation: "Engineer",
			action: "Approved",
		},
		{
			id: 4,
			firstName: "Subin",
			lastName: "Maharjan",
			email: "subinmaharjan01@gmail.com",
			designation: "Engineer",
			action: "Approved",
		},
	];

	return (
		<div classname="userTable">
			{/* <DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				checkboxSelection
				disableSelectionOnClick
			/> */}
			<h2 className='user'>Users page</h2>
		</div>
	);
}
