import React from "react";
import "./sidebar.css";
import { LineStyle, Home, People, Add, Timer } from "@material-ui/icons";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<h3 classname="sidebarTitle">Dashboard</h3>
					<ul className="sidebarList">
						<li className="sidebarListItem active">
							<Home />
							Home
						</li>
						<li className="sidebarListItem">
							<People />
							Users
						</li>
						<li className="sidebarListItem">
							<LineStyle />
							Inventory
						</li>
						<li className="sidebarListItem">
							<Add />
							Request
						</li>
						<li className="sidebarListItem">
							<Timer />
							Servicing
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
