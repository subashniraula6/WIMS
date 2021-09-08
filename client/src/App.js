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
import Inventory from "./Components/pages/Inventory/Inventory";

function App() {
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchCurrentUser());
	}, [dispatch]);
	return (
	<div className='App'>
		<Topbar />
		<div className="container-fluid px-lg-3">
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
				<AdminRoute
					exact
					path="/dashboard/inventories/:id"
					component={Inventory}
				/>
				<Route path='*' exact component={NoRoute} />
			</Switch>
			<Footer />
		</div>
	</div>
	);
}

export default App;
