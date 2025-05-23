import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { getAllBookEntries } from "../src/api";

export function Profile() {
	const [user, setUser] = new useState({});
	const [myBooks, setMyBooks] = new useState([]);

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
			<h1>Profile</h1>
			<h2>My book logs</h2>
			<div>
				{myBooks.map((entry) => {
					return <p>{entry.title}</p>;
				})}
			</div>
		</>
	);
}
