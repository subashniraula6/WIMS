import React from "react";
import "./topbar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logoutUser} from '../Redux/actions/authActions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Topbar() {
	const isAuthenticated = useSelector(store => store.authReducer.isAuthenticated);
	const dispatch = useDispatch();
	const location = useLocation();
	function handleLogout(){
		try {
			dispatch(logoutUser());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="topbar shadow mb-4 bg-white rounded px-2">
			<div className="topbarWrapper">
				<div className="topLeft">
					<Link className="logo" to="/">
						Wolfmatrix
					</Link>
				</div>
				<div className="topRight">
					{
						isAuthenticated ? 
						<Link to='/login' 
							onClick={handleLogout}
							className='text-danger nav-link'
						>
						<ExitToAppIcon />Logout
						</Link> 
						:
						<Link to='/login' className='nav-link '>
						<i className="bi bi-box-arrow-in-right"></i>Login
						</Link>
					}
				</div>
			</div>
		</div>
	);
}
