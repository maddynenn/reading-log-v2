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
			<Box
				sx={{
					top: 0,
					width: "90%",
					display: "flex",
					justifyContent: "flex-start",
					flexDirection: "column",
					textAlign: "left",
					"& h1": {
						margin: 0,
					},
					"& h2": {
						margin: 0,
					},
				}}
			>
				<h1>{entry.title}</h1>
				<h2>by {entry.author}</h2>
			</Box>

			<Box
				sx={{
					display: "flex",
					width: "100%",
					padding: "4px",
					textAlign: "left",
				}}
			>
				<Box
					sx={{
						textAlign: "left",
						paddingX: "20px",
					}}
				>
					<Typography>Published</Typography>
					<Typography>{entry.yearPubl}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingX: "20px",
					}}
				>
					<Typography>Genre</Typography>
					<Typography>{entry.genre}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingX: "20px",
					}}
				>
					<Typography>Pages</Typography>
					<Typography>{entry.pages}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
