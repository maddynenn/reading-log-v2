import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export function InfoCard(props) {
	const title = props.title;
	const value = props.value;
	const subtitle = props.subtitle;

	return (
		<>
			<Box
				sx={{
					bgcolor: "#cdffcc",
					display: "flex",
					alignItems: "flex-start",
					flexDirection: "column",
					width: "175px",
					padding: "10px",
					paddingX: "15px",
					margin: "10px",
					borderRadius: "8px",
					boxShadow: 2,
				}}
			>
				<Box>
					<Typography>{title}</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
					}}
				>
					<Typography
						sx={{
							paddingRight: "4px",
							fontSize: 25,
							fontWeight: "bold",
						}}
					>
						{value}
					</Typography>
					<Typography sx={{}} fontSize={12}>
						{subtitle}
					</Typography>
				</Box>
			</Box>
		</>
	);
}
