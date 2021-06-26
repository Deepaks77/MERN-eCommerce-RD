import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	let dispatch = useDispatch();
	let rUserState = useSelector((state) => state.user);

	useEffect(() => {
		if (rUserState && rUserState.token) history.push("/");
		// eslint-disable-next-line
	}, [rUserState]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			dispatch({
				type: "LOGGED_IN_USER",
				payload: {
					email: user.email,
					token: idTokenResult,
				},
			});
			history.push("/");
		} catch (err) {
			setLoading(false);
			console.log(err);
			toast.error(err.message);
		}
		console.log(email, password);
	};

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				dispatch({
					type: "LOGGED_IN_USER",
					payload: {
						email: user.email,
						token: idTokenResult,
					},
				});
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					placeholder="Your email"
					required
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoFocus
					placeholder="Your Password"
					required
				/>
			</div>

			<br />
			<Button
				onClick={handleSubmit}
				type="primary"
				block
				shape="round"
				className="mb-3"
				icon={<MailOutlined />}
				size="large"
				disabled={!email || password.length < 6}
			>
				Login with Email/Password
			</Button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<h4 className="text-danger">Loading ...</h4>
					) : (
						<h4>Login</h4>
					)}
					{loginForm()}
					<Button
						onClick={googleLogin}
						type="danger"
						block
						shape="round"
						className="mb-3"
						icon={<GoogleOutlined />}
						size="large"
					>
						Login with Google
					</Button>
					<Link to="/forgot/password" className="float-right text-danger">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
