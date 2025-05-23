import TextField from "@mui/material/TextField";
import { Button, Rating } from "@mui/material";
import { useState } from "react";
import { createBookEntry } from "../src/api";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { RatingInput } from "../src/components/RatingInput";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";
import { ThemeContext } from "@emotion/react";
import { deleteBookEntry } from "../src/api";
import * as jwt_decode from "jwt-decode";

export function LogBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [month, setMonth] = useState("");
	const [yearPubl, setYearPubl] = useState(0);
	const [genre, setGenre] = useState("");
	const [overallRating, setOverallRating] = useState(5);
	const [atmosphere, setAtmosphere] = useState(5);
	const [plot, setPlot] = useState(5);
	const [writing, setWriting] = useState(5);
	const [worldBuilding, setWorldBuilding] = useState(5);
	const [characters, setCharacters] = useState(5);
	const [emotion, setEmotion] = useState(5);
	const [enjoyment, setEnjoyment] = useState(5);
	const [format, setFormat] = useState("");
	const [pages, setPages] = useState(0);
	const [dateCreated, setDateCreated] = useState(new Date());
	const [user, setUser] = useState("");

	const [open, setOpen] = useState(false);

	const [tempId, setTempId] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	async function undoAndClose(event, reason) {
		handleClose(event, reason);

		console.log("now im here");
		//delete book entry
		await deleteBookEntry(tempId);

		console.log(tempId);
	}

	const action = (
		<Fragment>
			<Button color="secondary" size="small" onClick={undoAndClose}>
				UNDO
			</Button>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</Fragment>
	);

	function fetchUserId() {
		const token = sessionStorage.getItem("User");
		const decodedUser = jwt_decode.jwtDecode(token);
		const userId = decodedUser._id;
		return userId;
	}

	async function handleSubmit(event) {
		const createdObject = {
			title: title,
			author: author,
			month: month,
			yearPubl: yearPubl,
			genre: genre,
			overallRating: overallRating,
			atmosphere: atmosphere,
			plot: plot,
			writing: writing,
			worldBuilding: worldBuilding,
			characters: characters,
			emotion: emotion,
			enjoyment: enjoyment,
			format: format,
			pages: pages,
			dateCreated: new Date(),
			user: fetchUserId(),
		};

		//temporarily grabbing the id of the created object in case user wants to undo
		const data = await createBookEntry(createdObject);
		const insertedId = data["insertedId"];
		setTempId(insertedId);

		setOpen(true);

		setTitle("");
		setAuthor("");
		setMonth("");
		setYearPubl(0);
		setGenre("");
		setOverallRating(5);
		setAtmosphere(5);
		setPlot(5);
		setWriting(5);
		setWorldBuilding(5);
		setCharacters(5);
		setEmotion(5);
		setEnjoyment(5);
		setFormat("");
		setPages(5);
		console.log("made it here");
	}

	return (
		<>
			<h1>Log Your Book!</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<TextField
						id="title-field"
						label="Title"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
					<TextField
						id="author-field"
						label="Author"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setAuthor(e.target.value)}
						value={author}
						required
					/>
					<TextField
						id="month-field"
						label="Month"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setMonth(e.target.value)}
						inputProps={{ maxLength: 3 }}
						value={month}
						required
					/>
					<TextField
						id="year-publ-field"
						label="Year Published"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setYearPubl(e.target.value)}
						inputProps={{ maxLength: 4 }}
						value={yearPubl === 0 ? "" : yearPubl}
						required
					/>
					<TextField
						id="genre-field"
						label="Genre"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setGenre(e.target.value)}
						value={genre}
						required
					/>
					<TextField
						id="format-field"
						label="Format"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setFormat(e.target.value)}
						value={format === 0 ? "" : format}
						required
					/>
					<TextField
						id="pages-field"
						label="Page Number"
						variant="outlined"
						sx={{ margin: "5px" }}
						onChange={(e) => setPages(e.target.value)}
						value={pages === 0 ? "" : pages}
						required
					/>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 3,
							width: "100%",
						}}
					>
						<RatingInput
							label="Overall Rating"
							onChange={(e) => setOverallRating(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Atmosphere Rating"
							onChange={(e) => setAtmosphere(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Plot Rating"
							onChange={(e) => setPlot(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Writing Rating"
							onChange={(e) => setWriting(e.target.value)}
						></RatingInput>
						<RatingInput
							label="World-Building Rating"
							onChange={(e) => setWorldBuilding(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Characters Rating"
							onChange={(e) => setCharacters(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Emotion Rating"
							onChange={(e) => setEmotion(e.target.value)}
						></RatingInput>
						<RatingInput
							label="Enjoyment Rating"
							onChange={(e) => setEnjoyment(e.target.value)}
						></RatingInput>
					</Box>

					<Button variant="outlined" type="submit" color="success">
						Submit
					</Button>

					<Snackbar
						open={open}
						autoHideDuration={600000}
						onClose={handleClose}
						message="Book Entry Logged"
						action={action}
					/>
				</form>
			</div>
		</>
	);
}
