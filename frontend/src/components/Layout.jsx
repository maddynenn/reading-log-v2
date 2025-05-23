import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Layout() {
	const user = sessionStorage.getItem("User");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user]);

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}
