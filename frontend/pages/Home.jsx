import Box from "@mui/material/Box";
import { InfoCard } from "../src/components/InfoCard";
import {
	calculateBooksReadThisMonth,
	calculatePagesReadThisMonth,
	calculateTotalBooksRead,
} from "../src/utils";
import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import { getAllBookEntries } from "../src/api";
export function Home() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadAllBookEntries() {
			const token = sessionStorage.getItem("User");
			const decodedUser = jwt_decode.jwtDecode(token);
			const data = await getAllBookEntries();
			const filteredData = data.filter((entry) => entry.user === decodedUser._id);
			setBooks(filteredData);
			console.log(filteredData);
		}

		loadAllBookEntries();
	}, []);

	return (
		<>
			<h1>Home</h1>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					//bgcolor: "yellow",
					width: "100%",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%",
						//minWidth: "200px",
					}}
				>
					<InfoCard
						title="Books Read This Month"
						value={calculateBooksReadThisMonth(books)}
						subtitle="books"
					/>
					<InfoCard
						title="Pages Read This Month"
						value={calculatePagesReadThisMonth(books)}
						subtitle="pages"
					/>
					<InfoCard
						title="Total Books Read"
						value={calculateTotalBooksRead(books)}
						subtitle="books"
					/>
				</Box>
			</Box>
		</>
	);
}
