import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userList.css";
import {fetchUsers} from '../../Redux/actions/userActions'
import Spinner from "../../Spinner/Spinner";

const columns = [
	{ field: "id", headerName: "ID", width: 100 },

	{
		field: "fullName",
		headerName: "Full name",
		sortable: false,
		width: 160,
	},
    {
		field: "email",
		headerName: "Email",
		width: 200,
		editable: true,
	},
	{
		field: "role",
		headerName: "Role",
		width: 150,
		editable: true,
	},
	{
		field: "designation",
		headerName: "Designation",
		width: 150,
		editable: true,
	}
];

// const rows = [
// 	{
// 		id: 1,
// 		fullName: "Jon Snow",
// 		role: "Jon",
// 		email: "jon@gmail.com",
// 		devices: "Laptop"
// 	}
// ];


export default function UserList() {
    const dispatch = useDispatch();
    const userReducer = useSelector(store => store.userReducer);
    const { isLoading, users } = userReducer;
    console.log(users)
    useEffect(()=> {
        try {
            dispatch(fetchUsers())
        } catch (error) {
            console.log(error)
        }
    }, []);
    const rows = users.map(user => {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.roles[0],
            designation: user.designation
        }
    })
    if(isLoading) return <Spinner />
    return (
		<div className="container rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				User List
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