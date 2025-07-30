const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const axios = require("axios"); // Add this import at the top if not already there

let bookEntryRoutes = express.Router();

// 1 Basic Routes
// 2 Retrieve All
// 3 Retrieve One
// 4 Create One
// 5 Update One
// 6 Delete One

// 1 Retrieve All
//http://localhost:8000/bookEntries
bookEntryRoutes.route("/bookEntries").get(verifyToken, async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("bookEntry").find({}).toArray();
	if (data.length > 0) {
		response.json(data);
	} else {
		throw new Error("Data was not found");
	}
});

// 2 Retrieve One
bookEntryRoutes.route("/bookEntries/:id").get(verifyToken, async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("bookEntry").findOne({ _id: new ObjectId(request.params.id) });
	if (data && Object.keys(data).length > 0) {
		response.json(data);
	} else {
		throw new Error("Data was not found");
	}
});

// 3 Create One
bookEntryRoutes.route("/bookEntries").post(verifyToken, async (request, response) => {
	let db = database.getDb();
	let mongoObject = {
		title: request.body.title,
		author: request.body.author,
		month: request.body.month,
		yearPubl: request.body.yearPubl,
		genre: request.body.genre,
		overallRating: request.body.overallRating,
		atmosphere: request.body.atmosphere,
		plot: request.body.plot,
		writing: request.body.writing,
		worldBuilding: request.body.worldBuilding,
		characters: request.body.characters,
		emotion: request.body.emotion,
		enjoyment: request.body.enjoyment,
		format: request.body.format,
		pages: request.body.pages,
		dateCreated: request.body.dateCreated,
		user: request.body.user._id,
		img: request.body.img,
	};

	let data = await db.collection("bookEntry").insertOne(mongoObject);
	response.json(data);
});

// 4 Update One
bookEntryRoutes.route("/bookEntries/:id").put(verifyToken, async (request, response) => {
	let db = database.getDb();
	let mongoObject = {
		$set: {
			title: request.body.title,
			author: request.body.author,
			month: request.body.month,
			yearPubl: request.body.yearPubl,
			genre: request.body.genre,
			overallRating: request.body.overallRating,
			atmosphere: request.body.atmosphere,
			plot: request.body.plot,
			writing: request.body.writing,
			worldBuilding: request.body.worldBuilding,
			characters: request.body.characters,
			emotion: request.body.emotion,
			enjoyment: request.body.enjoyment,
			format: request.body.format,
			pages: request.body.pages,
			dateCreated: request.body.dateCreated,
			user: request.body.user,
			img: request.body.img,
		},
	};
	let data = db.collection("/bookEntry").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
	response.json(data);
});

// Delete One
bookEntryRoutes.route("/bookEntries/:id").delete(verifyToken, async (request, response) => {
	let db = database.getDb();

	let data = await db.collection("bookEntry").deleteOne({ _id: new ObjectId(request.params.id) });

	response.json(data);
});

function verifyToken(request, response, next) {
	const authHeaders = request.headers["authorization"];
	const token = authHeaders && authHeaders.split(" ")[1];
	if (!token) {
		return response.status(401).json({ message: "Authentication token is missing" });
	}

	jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
		if (error) {
			return response.status(403).json({ message: "Token is invalid" });
		}

		if (!request.body) request.body = {};
		request.body.user = user;
		next();
	});
}

module.exports = bookEntryRoutes;

// endpoint for Google Books API because CORS blocks frontend from calling API
bookEntryRoutes.route("/books/search").get(async (request, response) => {
	try {
		const { title, author, maxResults = 4 } = request.query;

		if (!title || !author) {
			return response.status(400).json({ error: "Title and author parameters are required" });
		}

		const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes";
		const query = `${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
		const apiKey = process.env.VITE_APP_GOOGLE_KEY_JULY;

		const params = {
			q: query,
			maxResults,
			key: apiKey,
		};

		const googleResponse = await axios.get(googleBooksUrl, { params });
		response.json(googleResponse.data);
	} catch (error) {
		console.error("Google Books API error:", error.message);
		response.status(500).json({ error: "Failed to fetch book data" });
	}
});
