import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");
	let dispatch = useDispatch();
	let rUserState = useSelector((state) => state.user);
	let cart = useSelector((state) => state.cart);
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
			<Item key="shop" icon={<ShoppingOutlined />}>
				<Link to="/shop">Shop</Link>
			</Item>
			<Item key="cart" icon={<ShoppingCartOutlined />}>
				<Link to="/cart">
					<Badge count={cart.length} offset={[9, 0]}>
						Cart
					</Badge>
				</Link>
			</Item>
			{!rUserState && (
				<Item
					key="register"
					icon={<UserAddOutlined />}
					className="float-right"
				>
					<Link to="/register">Register</Link>
				</Item>
			)}

			{!rUserState && (
				<Item
					key="login"
					icon={<UserOutlined />}
					className="float-right"
				>
					<Link to="/login">Login</Link>
				</Item>
			)}

			{rUserState && (
				<SubMenu
					icon={<SettingOutlined />}
					title={rUserState.email && rUserState.email.split("@")[0]}
					className="float-right"
				>
					{rUserState && rUserState.role === "subscriber" && (
						<Item>
							<Link to="/user/history">Dashboard</Link>
						</Item>
					)}

					{rUserState && rUserState.role === "admin" && (
						<Item>
							<Link to="/admin/dashboard">Dashboard</Link>
						</Item>
					)}
					<Item icon={<LogoutOutlined />} onClick={handleLogout}>
						Logout
					</Item>
				</SubMenu>
			)}
			<span className="float-right p-1">
				<Search />
			</span>
		</Menu>
	);
};

export default Header;
