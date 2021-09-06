import "./Login.css";
import { useState } from "react";
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {loginUser} from '../Redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import Redirector from "../Redirector/Redirector";

const Login = function () {
	const [user, setUser] = useState({email: "", password: ""});

	const [alert, setAlert] = useState(false);

	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)

	function handleChange(e) {
		const {name, value} = e.target;
		setUser({...user, [name]: value })
	}
	
	function handleSubmit(e){
		e.preventDefault();
		try {
			const credentials = {username: user.email, password: user.password};		
			dispatch(loginUser(credentials));
			setUser({email:"", password:""})
		} catch (e) {
			setAlert(true);
			console.log(e.message);
		}
	}
	if(isAuthenticated) return <Redirector />
	return (
		<div className="container d-flex justify-content-center">
		<form className="form p-5 formContainer" onSubmit={handleSubmit}>
			<h3 className="h2">Log in</h3>

			<div className="form-group mt-2">
				<label>Email</label>
				<input
					type="email"
					className="form-control"
					placeholder="Enter email"
					name='email'
					value={user.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group mt-2">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter password"
					name='password'
					value={user.password}
					onChange={handleChange}
					required
					minLength={6}
				/>
			</div>
			{
				alert ? <div className="form-group mt-2 text-danger">
						<i className="fas fa-exclamation-triangle m-2"></i>
						<label>Incorrect email or password</label>
						</div>
						: null
			}
			
			<div className="form-group mt-2">
				<div className="custom-control custom-checkbox">
					<input
						type="checkbox"
						className="custom-control-input"
						id="customCheck1"
					/>
					<label className="custom-control-label m-2" 
						htmlFor="customCheck1">
						Remember me
					</label>
				</div>
			</div>

			<button 
				type="submit" 
				className="btn btn-dark btn-lg btn-block" 
			>
				Sign in
			</button>
			<p className="forgot-password text-center mt-2">
				<button href="#" className="forgotPW">
					Forgot password?
				</button>
			</p>
			</form>
			<Link to='/dashboard/users'>dashboard</Link>
			</div>
	);
};

export default Login;
