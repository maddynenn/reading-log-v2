import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pageData } from "./pageData";
import Box from "@mui/material/Box";
import { Button, Rating, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export function NavBar() {
	const navigate = useNavigate();

	function handleLogout() {
		sessionStorage.removeItem("User");
		navigate("/");
	}

	return (
		<Box>
			<Box
				sx={{
					background: " #37704c",
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					zIndex: 999,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingX: 2,
				}}
			>
				<Box sx={{ display: "flex" }}>
					{pageData.map((page, index) => {
						return (
							<Link key={index} to={page.path}>
								<Button id="navbar" sx={{ color: "white" }}>
									{page.name}
								</Button>
							</Link>
						);
					})}
				</Box>
				<Button
					onClick={handleLogout}
					sx={{
						color: "white",
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 0.1)",
						},
						marginRight: 2,
					}}
				>
					<LogoutIcon></LogoutIcon>
				</Button>
			</Box>
		</Box>
	);
}
