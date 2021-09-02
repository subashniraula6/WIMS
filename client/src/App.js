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
	const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzA1NzA2NTcsImV4cCI6MTYzMDU3NDI1Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoic3ViYXNobmlyYXVsYTZAZ21haWwuY29tIn0.gwdGIzurQjHmWuIkA6CmBUgCgmkU4Ol9RVNzrXawRcgMhNtOhaMYOX5ZaNYN3AigmidmCrg_HhnoeVJtzIOlHrsAPxSjjmOVSoxU6D9ujZhzkhTqPaC60d-OSpe9v2KMuqiepxa9iQ24lC9IhFNVo5pTI9F0KfEwGe5xUjTqzHRlhEyDoBOmklIIGxY2XfGxBjZrUSHHmCSDlDG4cZ2tIZLYMhuunMS56lQrmI01KecjXXDfYlZXhCTj5aSSzuhYTazFO9Q0ED7I09wdZs6wmGX96qeYJ-czBiWtMaSwVkamtMPVWtcJtSV-FwUQV95q_LsXfBmZRhWIUNfEo5YByw"
	useEffect(()=>{
		fetch('http://localhost:8000') 
		.then(res => res.json())
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
