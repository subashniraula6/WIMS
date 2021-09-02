import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
	return (
		<div className="topbar shadow mb-4 bg-white rounded px-2">
			<div className="topbarWrapper">
				<div className="topLeft">
					<Link className="logo" to="/">
						Wolfmatrix
					</Link>
				</div>
				<div className="topRight">
					<div className="topbarIconContainer">
						<NotificationsNone />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer">
						<Language />
					</div>
					<div className="topbarIconContainer">
						<Settings />
					</div>
					<img
						src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
						alt="PP"
						className="topAvatar"
					/>
				</div>
			</div>
		</div>
	);
}
