import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getInventories } from '../../Redux/actions/inventoryactions'
import Spinner from "../../Spinner/Spinner";
import AddinventoryModal from "../../AddInventoryModal";
import { Link, Route, Switch } from "react-router-dom";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import { disposeInventory } from '../../Redux/actions/inventoryactions'
import { reviveInventory } from '../../Redux/actions/inventoryactions'

export default function AdminInventories() {
	const dispatch = useDispatch();
	const inventoryReducer = useSelector(store => store.inventoryReducer);
    const { isLoading, adminInventories } = inventoryReducer;
	React.useEffect(()=> {
		try {
			dispatch(getInventories())
		} catch (error) {
			console.log(error)
		}
	}, [])
	const columns = [
		{
			field: "view",
			headerName: 'View',
			width: 120,
			renderCell: (params) => (
				<>
					<Link to={`/dashboard/inventories/${params.id}`}>
						<ZoomOutMapIcon style={{fontSize: '1.8rem'}}/>
					</Link>
					<EditIcon style={{fontSize: '1.8rem'}}/>
					{(params.row.status==='disposed') ? 
						<RestoreFromTrashIcon onClick={()=>dispatch(reviveInventory(params.id))} style={{fontSize: '1.8rem'}}/>
						: 
						<DeleteIcon onClick={()=>dispatch(disposeInventory(params.id))} style={{fontSize: '1.8rem'}}/>}
				</>
			)
		},
		{ field: "id", headerName: "ID", width: 120 },
	
		{
			field: "brand",
			headerName: "Brand",
			sortable: false,
			width: 160,
		},
		{
			field: "category",
			headerName: "Category",
			width: 150,
			editable: true,
		},
		{
			field: "serialNumber",
			headerName: "Serial Number",
			width: 200,
			editable: true,
		},
		{
			field: "status",
			headerName: "Status",
			width: 200,
			editable: true,
		},
		{
			field: "user",
			headerName: "User",
			width: 200,
			editable: true,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			width: 200,
			editable: true,
		},
		{
			field: "disposedAt",
			headerName: "Disposed At",
			width: 200,
			editable: true,
		},
	];
	
	const rows = adminInventories.map(inv => {
        return {
            id: inv.id,
			brand: inv.brand,
			category: inv.category,
			serialNumber: inv.serialNumber,
			status: inv.status,
			user: inv.user.fullName,
			createdAt: inv.createdAt,
			disposedAt: inv.disposeAt
        }
    })
	
	if(isLoading) return <Spinner />
	return (
		<div className="container rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				Inventories List
			</div>
			<AddinventoryModal />
			<div
				className="container rounded p-2"
				style={{ height: 500, width: "100%" }}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					disableSelectionOnClick
				/>
			</div>
		</div>
	);
}
