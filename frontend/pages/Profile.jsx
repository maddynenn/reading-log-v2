import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { getAllBookEntries } from "../src/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Profile() {
	const [user, setUser] = new useState({});
	const [myBooks, setMyBooks] = new useState([]);
	let date = new Date(user.joinDate);
	let dateString = date.toString();

	useEffect(() => {
		async function loadAllUserData() {
			const token = sessionStorage.getItem("User");
			const decodedUser = jwt_decode.jwtDecode(token);
			const allEntries = await getAllBookEntries();
			const filterEntries = allEntries.filter((entry) => entry.user == decodedUser._id);
			setMyBooks(filterEntries);
			setUser(decodedUser);
			console.log(myBooks);
			console.log(decodedUser);
		}
		loadAllUserData();
	}, []);

	return (
		<>
			<h1>My Profile</h1>
			<Box>
				<h2>User Info</h2>
				<Typography>
					Name: {user.firstName} {user.lastName}
				</Typography>
				<Typography>Date Joined: {dateString.slice(4, 15)}</Typography>
			</Box>
			<h2>My Books</h2>
			<div>
				{myBooks.map((entry) => {
					return <p>{entry.title}</p>;
				})}
			</div>
		</>
	);
}
