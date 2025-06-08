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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "flex-start",
					borderBottom: 1,
				}}
			>
				<h1
					style={{
						margin: 0,
					}}
				>
					Home
				</h1>
			</Box>

			<Box
				sx={{
					width: "100%",
					height: "1px",
					background:
						"linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
					my: 2,
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					//bgcolor: "yellow",
					borderWidth: "1px",
					width: "95vw",
					//borderBottom: 1,
					//borderTop: 1,
					//borderColor: "black",
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
				<Box
					sx={{
						width: "100%",
						height: "1px",
						background:
							"linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
						my: 2,
					}}
				/>
			</Box>
		</Box>
	);
}
