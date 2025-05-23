const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let bookEntryRoutes = express.Router();

// 1 Basic Routes
// 2 Retrieve All
// 3 Retrieve One
// 4 Create One
// 5 Update One
// 6 Delete One

// 1 Retrieve All
//http://localhost:8000/bookEntries
bookEntryRoutes.route("/bookEntries").get(async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("bookEntry").find({}).toArray();
	if (data.length > 0) {
		response.json(data);
	} else {
		throw new Error("Data was not found");
	}
});

// 2 Retrieve One
bookEntryRoutes.route("/bookEntries/:id").get(async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("bookEntry").findOne({ _id: new ObjectId(request.params.id) });
	if (Object.keys(data).length > 0) {
		response.json(data);
	} else {
		throw new Error("Data was not found");
	}
});

// 3 Create One
bookEntryRoutes.route("/bookEntries").post(async (request, response) => {
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
		user: request.body.user,
	};

	let data = await db.collection("bookEntry").insertOne(mongoObject);
	response.json(data);
});

// 4 Update One
bookEntryRoutes.route("/bookEntries/:id").put(async (request, response) => {
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
		},
	};
	let data = db
		.collection("/bookEntry")
		.updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
	response.json(data);
});

// Delete One
bookEntryRoutes.route("/bookEntries/:id").delete(async (request, response) => {
	let db = database.getDb();

	let data = await db.collection("bookEntry").deleteOne({ _id: new ObjectId(request.params.id) });

	response.json(data);
});

module.exports = bookEntryRoutes;
