import React from "react";
import Sidebar from "../sidebar/Sidebar";
import SignUp from "../SignUp/SignUp";
import { Route, Switch } from "react-router-dom";
import User from "../pages/user/User";

export default function Dashboard() {
	return (
		<>
			<div className="container border-warning border">
				<h2 className="my-3 text-center">Dashboard</h2>
				<div className="row border border-primary">
					<div className="col-lg-3 pr-auto">
						<Sidebar />
					</div>
					<div className="col-lg-9">
						<Switch>
							<Route exact path="/dashboard/user" component={User} />
							{/* <Route exact path="/dashboard/signup" component={SignUp} /> */}
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
}
