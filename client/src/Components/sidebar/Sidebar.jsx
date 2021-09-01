import React from "react";
import "./sidebar.css";
import { LineStyle, Home, People, Add, Timer } from "@material-ui/icons";

export default function Sidebar() {
	return (
		<div className="sidebar border border-danger h-30">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
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
