import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
	return `${value}°C`;
}

export function RatingInput(inputProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				width: "100%",
				paddingX: 2,
				paddingY: 1,
			}}
		>
			<label>{inputProps.label}</label>
			<Slider
				aria-label="Temperature"
				defaultValue={5}
				getAriaValueText={valuetext}
				valueLabelDisplay="auto"
				shiftStep={30}
				step={1}
				marks
				min={0}
				max={10}
				onChange={inputProps.onChange}
				color="success"
			/>
		</Box>
	);
}
