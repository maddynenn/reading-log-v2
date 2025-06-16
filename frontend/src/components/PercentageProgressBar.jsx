import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export function PercentageProgressBar(props) {
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				p: "10px",
				marginY: "10px",
				borderRadius: "6px",
			}}
		>
			<p style={{ margin: 0, marginBottom: "0px", textAlign: "left" }}>{props.category}</p>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box sx={{ width: "100%", mr: 1 }}>
					<BorderLinearProgress color="success" variant="determinate" value={props.value} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{`${props.value}%`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
		...theme.applyStyles("dark", {
			backgroundColor: theme.palette.grey[800],
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: "#52cc7e",
		...theme.applyStyles("dark", {
			backgroundColor: "#308fe8",
		}),
	},
	backgroundColor: "#e8e8e8",
}));
