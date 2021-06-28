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
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		//used to get the authentication status
		//it is listener method that fires when auth status changed
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data.id,
							},
						});
					})
					.catch((err) => console.log(err));
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
				<UserRoute exact path="/user/history" component={History} />
				<UserRoute exact path="/user/password" component={Password} />
				<UserRoute exact path="/user/wishlist" component={WishList} />
				<AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
			</Switch>
		</>
	);
};

export default App;
