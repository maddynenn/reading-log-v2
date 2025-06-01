import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBookEntry } from "../src/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { rgbToHex } from "@mui/material";
import { formatDate } from "../src/utils";

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
		<Box
			sx={{
				margin: 0,
				padding: 10,
				position: "absolute",
				top: 50,
				left: 50,
				width: "50%",
			}}
		>
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
					paddingY: "10px",
				}}
			>
				<h1>{entry.title}</h1>
				<h2>by {entry.author}</h2>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					padding: "4px",
					textAlign: "left",
					//bgcolor: "primary.main",
				}}
			>
				<Box
					sx={{
						textAlign: "left",
						paddingRight: "20px",
					}}
				>
					<Typography fontWeight="bold">Published</Typography>
					<Typography color="dark grey">{entry.yearPubl}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingRight: "20px",
					}}
				>
					<Typography fontWeight="bold">Genre</Typography>
					<Typography>{entry.genre}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingRight: "20px",
					}}
				>
					<Typography fontWeight="bold">Pages</Typography>
					<Typography>{entry.pages}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingRight: "20px",
					}}
				>
					<Typography fontWeight="bold">Pages</Typography>
					<Typography>{entry.pages}</Typography>
				</Box>

				<Box
					sx={{
						textAlign: "left",
						paddingRight: "20px",
					}}
				>
					<Typography fontWeight="bold">Date Added</Typography>
					<Typography>{formatDate(entry.dateCreated)}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
