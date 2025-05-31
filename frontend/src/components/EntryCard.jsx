import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";

export function EntryCard({ entry }) {
	return (
		<Link to={`/log/:${entry._id}`}>
			<Box
				sx={{
					width: "100%",
					//height: 100,
					borderRadius: 1,
					padding: 1,
					margin: 0.5,
					bgcolor: "#7a8f64",
					"&:hover": {
						bgcolor: "#152b1b",
						color: "white",
					},
				}}
			>
				<Typography>{entry.title}</Typography>
				<Typography>{entry.author}</Typography>
				<Typography>{formatDate(entry.dateCreated)}</Typography>
			</Box>
		</Link>
	);
}
