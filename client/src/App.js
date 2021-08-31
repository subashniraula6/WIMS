import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/dashboard/Dashboard";

function App() {
	return (
		<>
			<Header />
			<div className="outer">
				<div className="inner">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/dashboard" component={Dashboard} />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default App;
