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
			//setOther(bookData);
			//console.log(bookData);
		}
		loadEntry();
	}, [id]);

	return (
		<Box
			sx={{
				margin: 0,
				padding: 10,
				position: "absolute",
				top: 75,
				left: 50,
				width: "50%",
				bgcolor: "#37704c",
				borderRadius: "10px 10px 0 0",
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
			{other.map((book) => {
				let tn = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
				console.log(book);
				return (
					<Button>
						<img width="80px" src={tn}></img>{" "}
					</Button>
				);
			})}
		</Box>
	);
}
