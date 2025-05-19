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
		console.log(e);
		let data = await createUser(user);
		if (data.status !== 200) {
			alert("Create user failed");
		}
		console.log(data);
	}

	function handleChange(e) {
		console.log(e.target.name + e.target.value);
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
					value={user.firstName}
					name="firstName"
					onChange={(e) => handleChange(e)}
					required
				/>
				<TextField
					id="last-name-field"
					label="Last Name"
					variant="outlined"
					sx={{ margin: "5px" }}
					value={user.lastName}
					name="lastName"
					onChange={handleChange}
					required
				/>
				<TextField
					id="email-field"
					label="Email"
					variant="outlined"
					sx={{ margin: "5px" }}
					value={user.email}
					name="email"
					onChange={handleChange}
					required
				/>
				<TextField
					id="password-field"
					label="Password"
					variant="outlined"
					sx={{ margin: "5px" }}
					value={user.password}
					name="password"
					onChange={handleChange}
					required
				/>
				<Button type="submit">Submit</Button>
			</form>
		</>
	);
}
