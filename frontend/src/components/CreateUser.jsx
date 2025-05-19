import { useState } from "react";
import { createUser } from "../api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function CreateUser() {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		let data = await createUser(user);
		if (data.status !== 200) {
			alert("Create user failed");
		}
		console.log(data);
	}

	function handleChange(e) {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					id="first-name-field"
					label="First Name"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					required
				/>
				<TextField
					id="last-name-field"
					label="Last Name"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					required
				/>
				<TextField
					id="email-field"
					label="Email"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					required
				/>
				<TextField
					id="password-field"
					label="Password"
					variant="outlined"
					sx={{ margin: "5px" }}
					onChange={handleChange}
					required
				/>
				<Button type="submit">Submit</Button>
			</form>
		</>
	);
}
