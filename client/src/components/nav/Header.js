import React, { useState } from "react";
import { Menu } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");
	let dispatch = useDispatch();
	let rUserState = useSelector((state) => state.user);
	let history = useHistory();
	const handleLogout = () => {
		auth.signOut();
		dispatch({
			type: "LOGOUT",
			payload: null,
		});
		history.push("/login");
	};
	const handleClick = (e) => {
		// console.log(e.key);
		setCurrent(e.key);
	};

	return (
		<Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			{!rUserState && (
				<Item key="register" icon={<UserAddOutlined />} className="float-right">
					<Link to="/register">Register</Link>
				</Item>
			)}

			{!rUserState && (
				<Item key="login" icon={<UserOutlined />} className="float-right">
					<Link to="/login">Login</Link>
				</Item>
			)}

			{rUserState && (
				<SubMenu
					icon={<SettingOutlined />}
					title={rUserState.email && rUserState.email.split("@")[0]}
					className="float-right"
				>
					<Item key="setting:1">Option 1</Item>
					<Item key="setting:2">Option 2</Item>
					<Item icon={<LogoutOutlined />} onClick={handleLogout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
