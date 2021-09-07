import "./App.css";
import Topbar from "./Components/topbar/Topbar";
import Dashboard from "./Components/dashboard/Dashboard";
import Landing from "./Components/landingPage/Landing";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Footer from "./Components/footer/footer";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { fetchCurrentUser } from "./Components/Redux/actions/authActions";
import Homepage from './Components/Homepage';
import NoRoute from "./Components/pages/NoRoute";
import AdminRoute from "./Components/routing/AdminRoute";
import UserRoute from './Components/routing/UserRoute';
import AdminInventories from './Components/pages/inventoriesList/AdminInventories'

function App() {
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchCurrentUser());
	}, [dispatch]);
	return (
	<>
		<Topbar />
		<div className="container-fluid border px-lg-3">
			<Switch>
				<Route path='/homepage' exact component={Homepage} />
				<Route path='/' exact component={Landing}/>
				<Route path='/login' exact component={Login}/>
				<AdminRoute
					exact
					path="/dashboard/users"
					component={Dashboard}
				/>
				<AdminRoute
					exact
					path="/dashboard/inventories"
					component={Dashboard}
				/>
				<AdminRoute
					exact
					path="/dashboard/servicings"
					component={Dashboard}
				/>
				<Route path='*' exact component={NoRoute} />
			</Switch>
			<Footer />
		</div>
	</>
	);
}

export default App;
