import React, {useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { XGrid } from '@material-ui/x-grid'
import { useDispatch, useSelector } from "react-redux";
import { getServicings } from '../Redux/actions/servicingAction'
import Spinner from "../Spinner/Spinner";
import {Container, Paper, Box} from '@material-ui/core'

const columns = [
	{ field: "id", headerName: "ID", width: 120 },

	{
		field: "inventory",
		headerName: "Inventory",
		sortable: false,
		width: 160,
		flex:1
	},
	{
		field: "servicingDate",
		headerName: "Servicing date",
		width: 180,
		editable: true,
		flex:1
	},
	{
		field: "remainingDays",
		headerName: "Remaining days",
		width: 180,
		editable: true,
		flex:1
	},
	{
		field: "status",
		headerName: "Status",
		width: 200,
		editable: true,
		flex:1
	},
	{
		field: "duration",
		headerName: "Servicing duration",
		width: 200,
		editable: true,
		flex:1
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
		const remainingDays = Math.round((new Date(serv.serviceAt) - new Date())/(1000*60*60*24))
		return {
            id: serv.id,
			inventory: serv.inventory.name,
			servicingDate: serv.serviceAt,
			remainingDays: remainingDays,
			status: (remainingDays<0) ? 'Required': 'Not required',
			duration: serv.durationInMonth
        }
    })
	
	if(isLoading) 
		return <Spinner />
	return (
		<Container>
			<div className="card-header bg-warning text-white text-center mt-1">
				Servicings List
			</div>
			<Paper component={Box} style={{height: 500, width: "100%"}}>
				<XGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					disableSelectionOnClick
				/>
			</Paper>
		</Container>
	);
}
