import { useEffect } from "react";
import { useState } from "react";
import { getAllBookEntries } from "../src/api";
import { EntryCard } from "../src/components/EntryCard";
import * as jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export function MyBooks() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadAllBookEntries() {
			const token = sessionStorage.getItem("User");
			const decodedUser = jwt_decode.jwtDecode(token);
			const data = await getAllBookEntries();
			const filteredData = data.filter((entry) => entry.user === decodedUser._id);
			setBooks(filteredData);
		}

		loadAllBookEntries();
	}, []);

	return (
		<>
			<Typography
				sx={{
					paddingY: "20px",
					paddingX: "5px",
					textAlign: "left",
					paddingTop: "25px",
				}}
				fontSize={30}
			>
				MyBooks
			</Typography>
			<Box
				sx={{
					width: "100%",
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gap: 5,
					width: "100%",
				}}
			>
				{books.map((book) => {
					return <EntryCard entry={book}></EntryCard>;
				})}
			</Box>
		</>
	);
}
