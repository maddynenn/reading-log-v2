import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pageData } from "./pageData";
import Box from "@mui/material/Box";
import { Button, Rating, Typography } from "@mui/material";

export function NavBar() {
	const navigate = useNavigate();

	function handleLogout() {
		sessionStorage.removeItem("User");
		navigate("/");
	}

	return (
		<Box
			sx={{
				background: " #152b1b",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
			}}
		>
			{pageData.map((page) => {
				return (
					<Link to={page.path}>
						<Button sx={{ color: "white" }}>{page.name}</Button>
					</Link>
				);
			})}
		</Box>
	);
}
