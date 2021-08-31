import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import { Login } from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import admin from "./Components/dashboard/admin";
import Topbar from "./Components/topbar/topbar";
import Sidebar from "./Components/sidebar/Sidebar";
import User from "./Components/pages/user/user";
import Home from "./Components/pages/home/Home";

function App() {
	return (
		<>
			<Header />
			{/* <Topbar /> */}
			<div className="container p-10 d-flex justify-content-center">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/user" component={User} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/admin" component={admin} />
				</Switch>
				{/* <Sidebar /> */}
			</div>
		</>
	);
}

export default App;
