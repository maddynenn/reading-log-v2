import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatDate } from "../utils";

export function EntryCard({ entry }) {
	return (
		<>
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
		</>
	);
}
