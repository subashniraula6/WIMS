import "./App.css";
import Header from "./Components/Header/Header";
import Topbar from "./Components/topbar/Topbar";
import Dashboard from "./Components/dashboard/Dashboard";
import Landing from "./Components/landingPage/Landing";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/routing/PrivateRoute";

function App() {
	return (
		<>
			<Topbar />
			<div className="container">
				{/* <Header /> */}
				<Switch>
					<Route exact path="/" component={Landing} />
					<PrivateRoute
						exact
						path="/login"
						component={Login}
						auth={{
							isAuthenticated: true,
							isLoading: false,
						}}
					/>
					<PrivateRoute
						auth={{
							isAuthenticated: true,
							isLoading: false,
						}}
						exact
						path="/dashboard"
						component={Dashboard}
					/>
				</Switch>
			</div>
		</>
	);
}

export default App;
