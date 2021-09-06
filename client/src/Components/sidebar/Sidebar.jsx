import React from "react";
import "./sidebar.css";
import { LineStyle, People, Add, Timer } from "@material-ui/icons";
import {Link, useLocation} from 'react-router-dom'


export default function Sidebar() {
	const location = useLocation();
	console.log(location.pathname)
	return (
		<div className="sidebar border border-warning h-20">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<ul className="sidebarList">
						<li className={`${location.pathname==='/dashboard/users' ? "active": ""} sidebarListItem`}>
							<Link to='/dashboard/users' className='nav-link d-flex'>
							<People />
								Users
							</Link>
						</li>
						<li className={`${location.pathname==='/dashboard/inventories' ? "active": ""} sidebarListItem`}>
							<Link to='/dashboard/inventories' className='nav-link d-flex'>
								<LineStyle />Inventories
							</Link>
						</li>
						<li className={`${location.pathname==='/dashboard/requests' ? "active": ""} sidebarListItem`}>
							<Link to='/dashboard/requests' className='nav-link d-flex'>
								<Add />
								Requests
							</Link>
						</li>
						<li className={`${location.pathname==='/dashboard/servicings' ? "active": ""} sidebarListItem`}>
							<Link to='/dashboard/servicings' className='nav-link d-flex'>
								<Timer />
								Servicings
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
