import { Redirect, Route } from "react-router";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, isLoading },
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!isLoading && !isAuthenticated ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
