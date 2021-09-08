import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<div className="landingContainer">
			<div>
				<h1 className="title text-uppercase">
					Welcome To Wolfmatrix Inventory Management System
				</h1>
			</div>
			<div className="container mt-2">
				<div className="row">
					<div className="col-sm-6 mt-2">
						<img
							className="mt-5 "
							src="https://wolfmatrix.com/wp-content/themes/wolfmatrix/images/mainLogo@2x.jpg"
							alt=""
							srcset=""
						/>

						<p className="lead">
							WIMS keeps track of inventories assigined to our employees. Keeps
							employees info. Notifies inventories serviceing.
						</p>
						<Link to="/login" className="btn m-2 btn-info">
							Get started
						</Link>
					</div>
					<div className="col-sm-6 mt-2">
						<img
							className="img-fluid"
							src="https://wolfmatrix.com/wp-content/uploads/2020/03/driven_by_values.png"
							alt=""
							srcset=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
