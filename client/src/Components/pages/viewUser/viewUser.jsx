import React from "react";
import "./viewuser.css";
import { Person, Email, EmojiPeople } from "@material-ui/icons";

export default function Viewuser() {
	return (
		<>
			<div className="container card bg-light mb-3 ">
				<div className="card-header bg-warning text-white text-center">
					View User
				</div>
				<div className="container  mt-3 mb-3">
					<div className="card mt-3 mb-3">
						<div className="card-body">
							<h5 className="card-title">
								<Person />
								Name
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">Subin Maharjan</h6>
							<h5 className="card-title">
								<EmojiPeople />
								Role
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">Intern</h6>
							<h5 className="card-title">
								<Email />
								Email
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">
								subinmaharjan01@gmail.com
							</h6>
						</div>
					</div>
				</div>
				<h4>Assigned Inventories</h4>
				<hr />
				<div className="container border border-dark mb-3 rounded">
					<h5 className>Devices</h5>
					<div className="card  mb-3 ">
						<div className="card-body d-flex flex-row justify-content-around ">
							<h5 className="card-title">Name</h5>

							<h5 className="card-title">Brand</h5>

							<h5 className="card-title">Serial Number</h5>

							<h5 className="card-title">Image</h5>
						</div>
						<hr />
						<div className="card-body d-flex flex-row 				justify-content-around ">
							<h6 className="card-subtitle mb-2 text-muted">Dell</h6>
							<h6 className="card-subtitle mb-2 text-muted">Xps</h6>
							<h6 className="card-subtitle mb-2 text-muted">Wm-0101</h6>
							<h6 className="card-subtitle mb-2 text-muted">Img</h6>
						</div>
					</div>
				</div>
				<div className="container border border-dark mb-3 rounded">
					<h5 className>Furniture</h5>
					<div className="card mb-3">
						<div className="card-body d-flex flex-row justify-content-around ">
							<h5 className="card-title">Category</h5>

							<h5 className="card-title">Serial Number</h5>

							<h5 className="card-title">Image</h5>
						</div>
						<hr />
						<div className="card-body d-flex flex-row justify-content-around   ">
							<h6 className="card-subtitle mb-2 text-muted">Table</h6>
							<h6 className="card-subtitle mb-2 text-muted">WM-IN-044</h6>
							<h6 className="card-subtitle mb-2 text-muted">Img</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
