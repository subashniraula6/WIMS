import "./App.css";
import Header from "./Components/Header/Header";
import Topbar from "./Components/topbar/Topbar";
import Dashboard from "./Components/dashboard/Dashboard";
import Landing from "./Components/landingPage/Landing";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Footer from "./Components/footer/footer";
import {useEffect} from 'react';

function App() {
	useEffect(()=>{
		fetch('http://localhost:8000') 
		.then(res => {
			console.log(res);
			return res.json()
		})
		.then(result => console.log(result))
		.catch(err => console.error(err))
	}, []);
	return (
		<>
			<Topbar />
			<div className="container-fluid">
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
						path="/dashboard/user"
						component={Dashboard}
					/>
				</Switch>
				<Footer />
			</div>
		</>
	);
}

export default App;
