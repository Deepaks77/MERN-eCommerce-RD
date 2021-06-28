import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let dispatch = useDispatch();
	let rUserState = useSelector((state) => state.user);

	useEffect(() => {
		const emailFromLocalStorage = window.localStorage.getItem(
			"emailForRegistration"
		);
		if (rUserState && rUserState.token) history.push("/");
		else {
			if (emailFromLocalStorage)
				setEmail(window.localStorage.getItem("emailForRegistration"));
			else history.push("/register");
		}
		// eslint-disable-next-line
	}, [rUserState]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//validation
		if (!email || !password) {
			toast.error("email and password is required");
			return;
		}
		if (password.length < 6) {
			toast.error("password must be at least 6 chracters long");
			return;
		}
		try {
			//we are directly signining with email link that was sent with firebase
			//window.location.href means full url.
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				//remove user email from local storage
				window.localStorage.removeItem("emailForRegistration");
				//update user password
				let user = auth.currentUser; //returns current logged in user object
				//initial we have not set the user's password
				//just doing it signing passwordless now we are saving it in a seperate request
				await user.updatePassword(password);
				//get currently logged in user's token (jwt) it will be later intergated with Node js to protect route
				const idTokenResult = await user.getIdTokenResult();
				//redux store
				createOrUpdateUser(idTokenResult.token)
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

				//redirect
				history.push("/");
			}
		} catch (err) {
			console.log(err);
			toast.error(err.message);
		}

		//get email from local storage
		window.localStorage.setItem("emailForRegistration", email);
	};

	const completeRegisterationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
				disabled
			/>
			<br />
			<input
				type="password"
				className="form-control"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="password"
				autoFocus
			/>
			<br />
			<button type="submit" className="btn btn-raised">
				Complete Registration
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>
					{completeRegisterationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
