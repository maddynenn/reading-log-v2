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
					bgcolor: "#37704c",
					"&:hover": {
						bgcolor: "#152b1b",
						color: "white",
					},
					minWidth: "300px",
					color: "white",
					boxShadow: 3,
					border: 1,
					borderColor: "black",
				}}
			>
				<Typography p={0} class="entry">
					{entry.title}
				</Typography>
				<Typography p={0} class="entry">
					{entry.author}
				</Typography>
				<Typography p={0} class="entry">
					{formatDate(entry.dateCreated)}
				</Typography>
			</Box>
		</Link>
	);
}
