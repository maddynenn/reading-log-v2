import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { createBookEntry, deleteBookEntry } from "../src/api";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import * as jwt_decode from "jwt-decode";
import axios from "axios";
import React from "react";
import { RatingInput } from "../src/components/RatingInput";

export function LogBook() {
	// state variables
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
	const [thumbnail, setThumbnail] = useState("");
	const [imgs, setImgs] = useState([]);
	const [open, setOpen] = useState(false);
	const [tempId, setTempId] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	async function undoAndClose(event, reason) {
		handleClose(event, reason);
		await deleteBookEntry(tempId);
	}

	async function fetchImgs() {
		if (!title.trim() || !author.trim()) {
			setImgs([]);
			return;
		}

		try {
			const res = await axios.get(
				`https://reading-log-v2.onrender.com/books/search?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&maxResults=4`
				//`http://localhost:8000/books/search?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&maxResults=4`
			);

			if (res.data.items) {
				setImgs(res.data.items);
			} else {
				setImgs([]);
			}
		} catch (err) {
			console.log(err);
			setImgs([]);
		}
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchImgs();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [title, author]);

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
		return decodedUser._id;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const createdObject = {
			title,
			author,
			month,
			yearPubl,
			genre,
			overallRating,
			atmosphere,
			plot,
			writing,
			worldBuilding,
			characters,
			emotion,
			enjoyment,
			format,
			pages,
			dateCreated: new Date(),
			user: fetchUserId(),
			img: thumbnail,
		};

		const data = await createBookEntry(createdObject);
		setTempId(data["insertedId"]);
		setOpen(true);

		// reset the form
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
		setThumbnail("");
		setImgs([]);
	}

	return (
		<>
			<>
				<Box
					sx={{
						alignSelf: "flex-start",
						borderBottom: 1,
						marginLeft: 1,
					}}
				>
					<Typography fontSize={30}>Log Your Book!</Typography>
				</Box>

				<Box
					sx={{
						width: "100%",
						height: "1px",
						background: "linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
						my: 2,
					}}
				/>

				<div>
					<form onSubmit={handleSubmit}>
						<TextField
							id="title-field"
							label="Title"
							variant="outlined"
							sx={{ margin: "5px" }}
							onChange={(e) => {
								setTitle(e.target.value);
								fetchImgs();
							}}
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
							<RatingInput label="Overall Rating" onChange={(e) => setOverallRating(e.target.value)}></RatingInput>
							<RatingInput label="Atmosphere Rating" onChange={(e) => setAtmosphere(e.target.value)}></RatingInput>
							<RatingInput label="Plot Rating" onChange={(e) => setPlot(e.target.value)}></RatingInput>
							<RatingInput label="Writing Rating" onChange={(e) => setWriting(e.target.value)}></RatingInput>
							<RatingInput label="World-Building Rating" onChange={(e) => setWorldBuilding(e.target.value)}></RatingInput>
							<RatingInput label="Characters Rating" onChange={(e) => setCharacters(e.target.value)}></RatingInput>
							<RatingInput label="Emotion Rating" onChange={(e) => setEmotion(e.target.value)}></RatingInput>
							<RatingInput label="Enjoyment Rating" onChange={(e) => setEnjoyment(e.target.value)}></RatingInput>
						</Box>

						{imgs.length > 0 && (
							<Box>
								<p>Choose a Thumbnail</p>
								{imgs.map((book, index) => {
									let tn = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;

									// Skip books without thumbnails
									if (!tn) return null;

									return (
										<Button
											key={index}
											onClick={() => setThumbnail(tn)}
											sx={{
												border: thumbnail === tn ? "3px solid #37704c" : "none",
												margin: "4px",
											}}
										>
											<img width={thumbnail === tn ? "100px" : "80px"} src={tn} alt={book.volumeInfo.title || "Book thumbnail"} />
										</Button>
									);
								})}
							</Box>
						)}

						<Button variant="outlined" type="submit" color="success">
							Submit
						</Button>

						<Snackbar open={open} autoHideDuration={600000} onClose={handleClose} message="Book Entry Logged" action={action} />
					</form>
				</div>
			</>

			<Snackbar open={open} autoHideDuration={600000} onClose={handleClose} message="Book Entry Logged" action={action} />
		</>
	);
}
