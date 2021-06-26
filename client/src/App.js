import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		//used to get the authentication status
		//it is listener method that fires when auth status changed
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				dispatch({
					type: "LOGGED_IN_USER",
					payload: {
						email: user.email,
						token: idTokenResult.token,
					},
				});
			}
		});

		return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/register/complete" component={RegisterComplete} />
				<Route exact path="/forgot/password" component={ForgotPassword} />
			</Switch>
		</>
	);
};

export default App;
