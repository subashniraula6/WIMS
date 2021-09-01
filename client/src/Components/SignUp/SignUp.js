import React, { Component } from "react";

export default class SignUp extends Component {
	render() {
		return (
			<form className="form p-5 formContainer border border-danger">
				<h3>Sign Up</h3>

				<div className="form-group">
					<label>First name</label>
					<input
						type="text"
						className="form-control"
						placeholder="First name"
					/>
				</div>

				<div className="form-group">
					<label>Last name</label>
					<input type="text" className="form-control" placeholder="Last name" />
				</div>

				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
					/>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
					/>
				</div>

				<button
					type="submit"
					className="btn btn-dark btn-lg btn-block my-3 btn-md p-1"
				>
					Sign Up
				</button>
				<p className="forgot-password text-right">
					Already registered <a href="/Login">log in?</a>
				</p>
			</form>
		);
	}
}
