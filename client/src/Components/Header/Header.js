import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<>
			<div className="header">
				<nav className="navbar navbar-expand-lg navbar-light fixed-top">
					<div className="container">
						<Link className="navbar-brand" to={"/"}>
							Inventory Management System
						</Link>
						<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
							<ul className="navbar-nav ms-auto">
								<li className="nav-item">
									<Link className="nav-link" to={"/login"}>
										Sign in
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to={"/signup"}>
										Sign up
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Header;
