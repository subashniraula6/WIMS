import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./inventoriesList.css";

const columns = [
	{ field: "id", headerName: "ID", width: 120 },

	{
		field: "name",
		headerName: "Name",
		sortable: false,
		width: 160,
	},
	{
		field: "type",
		headerName: "Type",
		width: 150,
		editable: true,
	},
	{
		field: "category",
		headerName: "Category",
		width: 200,
		editable: true,
	},
	{
		field: "brand",
		headerName: "Brand",
		width: 200,
		editable: true,
	},
	{
		field: "serial",
		headerName: "Serial Number",
		width: 200,
		editable: true,
	},
	{
		field: "remarks",
		headerName: "Remarks",
		width: 200,
		editable: true,
	},
];

const rows = [
	{
		id: 1,
		name: "Dell",
		type: "Devices",
		category: "Laptop",
		brand: "Xps",
		serial: "WM-IN-010",
		remarks: "Nice",
	},
	{
		id: 2,
		name: "Dell",
		type: "Devices",
		category: "Laptop",
		brand: "Xps",
		serial: "WM-IN-010",
		remarks: "Nice",
	},
];

export default function InventoriesList() {
	return (
		<div className="container border border-warning rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				Inventories List
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
