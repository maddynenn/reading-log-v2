import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../api";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export function Login() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	function handleChange(e) {
		setUser({
			...user,
			[e.target.name]: [e.target.value],
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		let response = await verifyUser(user);

		if (response) {
			sessionStorage.setItem("User", response);
			axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
			navigate("/home");
		} else {
			alert("login failed");
		}
	}

	return (
		<Box display={"flex"} flexDirection={"row"}>
			<form onSubmit={handleSubmit}>
				<TextField
					id="email-field"
					label="Email"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					value={user.email}
					required
				/>
				<TextField
					id="password-field"
					label="Password"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					value={user.password}
					required
				/>
				<Button color="success" variant="outlined" type="submit">
					Submit
				</Button>
			</form>
		</Box>
	);
}
