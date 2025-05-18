import { useState } from "react";
import { Login } from "../src/components/Login";
import { CreateUser } from "../src/components/CreateUser";
import Button from "@mui/material/Button";

export function Landing() {
	const [view, setView] = useState(0);

	return (
		<>
			{!view ? (
				<>
					<Login />
					<Button onClick={() => setView(!view)}>Create Account</Button>
				</>
			) : (
				<>
					<CreateUser />
					<Button onClick={() => setView(!view)}>Sign in</Button>
				</>
			)}
		</>
	);

	return (
		<>
			<h1>Landing</h1>
			<Login />
		</>
	);
}
