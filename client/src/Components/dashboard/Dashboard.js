import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";
import UserList from "../pages/user/UserList";
import AdminRoute from "../routing/AdminRoute";
import AdminInventories from "../pages/inventoriesList/AdminInventories";
import servicingList from "../servicings/ServicingList";

export default function Dashboard() {
	return (
		<>
			<div className="container-fluid">
				<h2 className="my-3 text-center">Dashboard</h2>
				<div className="row">
					<div className="col-lg-2">
						<Sidebar />
					</div>
					<div className="col-lg-10">
						<Switch>
							<Route exact path="/dashboard/users" component={UserList} />
							<Route exact path="/dashboard/inventories" component={AdminInventories} />
							<Route exact path="/dashboard/servicings" component={servicingList} />
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
}
