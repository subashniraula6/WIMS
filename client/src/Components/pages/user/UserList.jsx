import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./userList.css";
import {fetchUsers} from '../../Redux/actions/userActions'
import Spinner from "../../Spinner/Spinner";
import AddUserModal from "../../AddUserModal";
import { makeStyles } from '@material-ui/styles';

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
		width: 170,
		editable: true,
	},
	{
		field: "status",
		headerName: "Status",
		width: 170,
		editable: true,
	},
	{
		field: "joinedAt",
		headerName: "Joined At",
		width: 170,
		editable: true,
	},
	{
		field: "createdAt",
		headerName: "Created At",
		width: 170,
		editable: true,
	},
	{
		field: "addedBy",
		headerName: "Added By",
		width: 170,
		editable: true,
	},
];
const useStyles = makeStyles({
	root: {
	  '& .super-app-theme--header': {
		backgroundColor: 'red',
	  },
	},
  });

export default function UserList() {
    const dispatch = useDispatch();
    const userReducer = useSelector(store => store.userReducer);
    const { isLoading, users } = userReducer;

	const classes = useStyles();
    
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
            designation: user.designation,
			status: user.status,
			joinedAt: user.joinedAt,
			createdAt: user.createdAt,
			addedBy: user.addedBy
        }
    })
    if(isLoading) return <Spinner />
    return (
		<div className="container rounded my-3 bg-light">
			<div className="card-header bg-warning text-white text-center mt-1">
				User List
			</div>
			<AddUserModal />
			<div
				className={classes.root}
				style={{ height: 400, width: "100%" }}
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