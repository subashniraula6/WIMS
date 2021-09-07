import React from "react";
import "./viewfurniture.css";
import { Photo, Filter9Plus, DoubleArrow } from "@material-ui/icons";

export default function Viewfurniture() {
	return (
		<>
			<div className="container card bg-light mb-3 ">
				<div className="card-header bg-warning text-white text-center">
					Furniture Details
				</div>
				<div className="container  mt-3 mb-3">
					<div className="card mt-3 mb-3">
						<div className="card-body">
							<h5 className="card-title">
								<DoubleArrow />
								Type
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">Table</h6>
							<h5 className="card-title">
								<Filter9Plus />
								Serial Number
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">WM-IN-010</h6>
							<h5 className="card-title">
								<Photo />
								Image
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">Img</h6>
						</div>
					</div>
				</div>
				<h4>Current Owner</h4>
				<hr />

				<div className="container border border-dark mb-3 rounded">
					<h5 className>Subin Maharjan</h5>
					<div className="card mb-3">
						<div className="card-body d-flex flex-row justify-content-around ">
							<h5 className="card-title">Role</h5>

							<h5 className="card-title">Email</h5>
						</div>
						<hr />
						<div className="card-body d-flex flex-row justify-content-around   ">
							<h6 className="card-subtitle mb-2 text-muted">Intern</h6>
							<h6 className="card-subtitle mb-2 text-muted">
								subinmaharjan01@gmail.com
							</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
