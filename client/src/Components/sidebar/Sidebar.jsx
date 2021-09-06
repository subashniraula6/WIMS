import React from "react";
import "./sidebar.css";
import { LineStyle, People, Add, Timer } from "@material-ui/icons";
import {Link} from 'react-router-dom'

export default function Sidebar() {
	return (
		<div className="sidebar border border-warning h-20">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<ul className="sidebarList">
						<li className="sidebarListItem">
							<Link to='/dashboard/users' className='nav-link d-flex'>
							<People />
								Users
							</Link>
						</li>
						<li className="sidebarListItem">
							<Link to='/dashboard/inventories' className='nav-link d-flex'>
								<LineStyle />Inventory
							</Link>
						</li>
						<li className="sidebarListItem">
							<Link to='/dashboard/inventories' className='nav-link d-flex'>
								<Add />
								Requests
							</Link>
						</li>
						<li className="sidebarListItem">
							<Link to='/dashboard/inventories' className='nav-link d-flex'>
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
