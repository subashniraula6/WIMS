import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./userRequestStatus.css";
import { DateRange } from "@material-ui/icons";

const columns = [
	{ field: "id", headerName: "ID", width: 120 },

	{
		field: "name",
		headerName: "Name",
		sortable: false,
		width: 160,
	},
	{
		field: "email",
		headerName: "Email",
		width: 220,
		editable: true,
	},
	{
		field: "description",
		headerName: "Description",
		width: 200,
		editable: true,
	},
	{
		field: "status",
		headerName: "Status",
		width: 175,
	},
];

const rows = [
	{
		id: 1,
		name: "Subin",
		email: "subinmaharjan01@gmail.com",
		description: "Need new Laptop",
		status: "Pending",
	},
];

export default function UserRequestStatus() {
	return (
		<div className="container border border-warning rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				<DateRange />
				Request Status
			</div>
			<div
				className="container border border-dark rounded my-3 p-2"
				style={{ height: 400, width: "100%" }}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					checkboxSelection
					disableSelectionOnClick
				/>
			</div>
		</div>
	);
}
