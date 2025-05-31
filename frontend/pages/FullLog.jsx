import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBookEntry } from "../src/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export function FullLog() {
	const [entry, setEntry] = useState({});
	let params = useParams();
	const navigate = useNavigate();
	let id = params.id;

	useEffect(() => {
		async function loadEntry() {
			let data = await getOneBookEntry(id);
			setEntry(data);
		}
		loadEntry();
	}, [id]);

	return (
		<Box>
			<h1>Your Rating of: {entry.title}</h1>
			<h2>Book Information</h2>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 1,
					width: "100%",
				}}
			>
				<Typography>Author: {entry.author}</Typography>
				<Typography>{entry.genre}</Typography>
				<Typography>{entry.yearPubl}</Typography>
			</Box>
		</Box>
	);
}
