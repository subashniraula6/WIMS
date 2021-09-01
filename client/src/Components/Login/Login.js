import "./Login.css";

const Login = function () {
	return (
		<form className="form p-5 formContainer ">
			<h3 className="h2">Log in</h3>

			<div className="form-group mt-2">
				<label>Email</label>
				<input
					type="email"
					className="form-control"
					placeholder="Enter email"
				/>
			</div>

			<div className="form-group mt-2">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter password"
				/>
			</div>

			<div className="form-group mt-2">
				<div className="custom-control custom-checkbox">
					<input
						type="checkbox"
						className="custom-control-input"
						id="customCheck1"
					/>
					<label className="custom-control-label m-2" htmlFor="customCheck1">
						Remember me
					</label>
				</div>
			</div>

			<button type="submit" className="btn btn-dark btn-lg btn-block">
				Sign in
			</button>
			<p className="forgot-password text-center mt-2">
				<a href="#" className="forgotPW">
					Forgot password?
				</a>
			</p>
		</form>
	);
};

export default Login;
