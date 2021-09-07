import React, {useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getServicings } from '../Redux/actions/servicingAction'
import Spinner from "../Spinner/Spinner";

const columns = [
	{ field: "id", headerName: "ID", width: 120 },

	{
		field: "inventory",
		headerName: "Inventory",
		sortable: false,
		width: 160,
	},
	{
		field: "servicingDate",
		headerName: "Servicing date",
		width: 180,
		editable: true,
	},
	{
		field: "remaining",
		headerName: "Remaining days",
		width: 180,
		editable: true,
	},
	{
		field: "status",
		headerName: "Status",
		width: 200,
		editable: true,
	},
	{
		field: "duration",
		headerName: "Servicing duration",
		width: 200,
		editable: true,
	}
];

export default function ServicingList() {
	const dispatch = useDispatch();
	const servicingReducer = useSelector(store => store.servicingReducer);
    const { isLoading, servicings } = servicingReducer;
	
	useEffect(()=> {
		try {
			dispatch(getServicings())
		} catch (error) {
			console.log(error)
		}
	}, [])
	const rows = servicings.map(serv => {
        return {
            id: serv.id,
			inventory: serv.inventory.name,
			servivingDate: serv.serviceAt,
			remainingDays: serv.serviceAt,
			status: serv.status,
			duration: serv.durationInMonth
        }
    })
	
	if(isLoading) 
		return <Spinner />
	return (
		<div className="container border border-warning rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				Servicings List
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
