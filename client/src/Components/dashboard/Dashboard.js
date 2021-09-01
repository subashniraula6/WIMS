import React from "react";
import Sidebar from "../sidebar/Sidebar";
import SignUp from "../SignUp/SignUp";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import User from "../pages/user/user";

export default function Dashboard() {
	return (
		<>
			<div className="container border-warning border">
				<h2 className="my-3 text-center">Dashboard</h2>
				<div className="row border border-primary">
					<div className="col-3 pr-auto">
						<Sidebar />
					</div>
					<div className="col-9">
						<Switch>
							<Route exact path="/dashboard/home" component={Home} />
							<Route exact path="/dashboard/user" component={User} />
							<Route exact path="/dashboard/signup" component={SignUp} />
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
}
