import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function EntryCard({ entry }) {
	return (
		<>
			<Box>
				<Typography>{entry.title}</Typography>
				<Typography>{entry.author}</Typography>
				<Typography>{entry.dateCreated}</Typography>
			</Box>
		</>
	);
}
