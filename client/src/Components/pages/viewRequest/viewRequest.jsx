import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CheckBox, Delete, List } from "@material-ui/icons";
import "./viewRequest.css";

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
		field: "remarks",
		headerName: "Remarks",
		width: 175,
		renderCell: (params) => {
			return (
				<>
					<div className="container buttons">
						<div className="m-2">
							<button type="button" class="btn btn-success">
								Accept
							</button>
						</div>
						<div className="m-2">
							<button type="button" class="btn btn-danger">
								Decline
							</button>
						</div>
					</div>
				</>
			);
		},
	},
];

const rows = [
	{
		id: 1,
		name: "Subin",
		email: "subinmaharjan01@gmail.com",
		description: "Need new Laptop",
		brand: "Xps",
		serial: "WM-IN-010",
	},
];

export default function ViewRequest() {
	return (
		<div className="container border border-warning rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				<List />
				Request List
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
