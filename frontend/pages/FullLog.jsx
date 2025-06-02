import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBookEntry } from "../src/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { rgbToHex } from "@mui/material";
import { formatDate } from "../src/utils";
import axios from "axios";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { ProgressWithLabel } from "../src/components/ProgressWithLabel";

export function FullLog() {
	const [entry, setEntry] = useState({});
	const [other, setOther] = useState([]);
	const [thumbNail, setThumbNail] = useState("");
	let params = useParams();
	const navigate = useNavigate();
	let id = params.id;

	useEffect(() => {
		async function loadEntry() {
			let data = await getOneBookEntry(id);
			setEntry(data);

			let bookData = await axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${data.title}+inauthor:${data.author}&maxResults=5&key=AIzaSyCOgcNZVDnmKBgxsTtW_lB3CHlMiHyD_yk`
				)
				.then((res) => setOther(res.data.items))
				.catch((err) => console.log(err));
		}
		loadEntry();
	}, [id]);

	return (
		<>
			<Box
				sx={{
					margin: 0,
					padding: 10,
					position: "absolute",
					top: 75,
					left: 50,
					width: "50%",
					background: "linear-gradient(to right, #37704c, #52cc7e)",

					borderRadius: "10px 10px 0 0",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						//justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							paddingRight: "25px",
						}}
					>
						<img width="150px" src={entry.img}></img>
					</Box>
					<Box>
						<Box
							sx={{
								top: 0,
								width: "100%",
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
								color: "white",
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
								color: "white",
								fontFamily: "Arial, sans-serif",
								//bgcolor: "primary.main",
							}}
						>
							<Box
								sx={{
									textAlign: "left",
									paddingRight: "20px",
									color: "white",
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
								<Typography fontWeight="bold">Date Added</Typography>
								<Typography>{formatDate(entry.dateCreated)}</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					margin: 0,
					padding: 10,
					position: "absolute",
					top: 400,
					left: 50,
					width: "50%",
					bgcolor: "white",
					borderRadius: "0 0 0 0",
				}}
			>
				<p style={{ textAlign: "left", fontSize: "20px" }}>My ratings</p>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 5,
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<ProgressWithLabel value={entry.overallRating} category={"Overall"}></ProgressWithLabel>
						<ProgressWithLabel value={entry.plot} category={"Plot"}></ProgressWithLabel>
						<ProgressWithLabel
							value={entry.worldBuilding}
							category={"World Building"}
						></ProgressWithLabel>
						<ProgressWithLabel value={entry.emotion} category={"Emotion"}></ProgressWithLabel>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<ProgressWithLabel value={entry.atmosphere} category={"Atmosphere"}></ProgressWithLabel>
						<ProgressWithLabel value={entry.writing} category={"Writing"}></ProgressWithLabel>
						<ProgressWithLabel value={entry.atmosphere} category={"Characters"}></ProgressWithLabel>
						<ProgressWithLabel value={entry.atmosphere} category={"Enjoyment"}></ProgressWithLabel>
					</Box>
				</Box>
			</Box>
		</>
	);
}
