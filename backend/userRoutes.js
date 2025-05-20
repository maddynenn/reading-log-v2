const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ExplainVerbosity } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

userRoutes.route("/users").get(async (request, response) => {
	let db = database.getDb();

	let data = await db.collection("users").find({}).toArray();

	if (data.length > 0) {
		return response.json(data);
	} else {
		throw new Error("uh oh this get all users route didnt work");
	}
});

userRoutes.route("/users/:id").get(async (request, response) => {
	let db = database.getDb();

	let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) });

	if (Object.keys(data).length > 0) {
		return response.json(data);
	} else {
		throw new Error("uh oh this get one user route didnt work");
	}
});

userRoutes.route("/users").post(async (request, response) => {
	let db = database.getDb();
	//const takenEmail = await db.collection("users").findOne({ email: request.body.email });
	//if (takenEmail) {
	//response.json({ message: "The email is taken" });
	//} else {
	const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

	let mongoObject = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		password: hash,
		joinDate: new Date(),
	};

	let data = await db.collection("users").insertOne(mongoObject);
	response.json(data);
	//}
});

userRoutes.route("/users/:id").put(async (request, response) => {
	let db = database.getDb();
	let mongoObject = {
		$set: {
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			email: request.body.email,
			password: request.body.password,
			joinDate: joinDate,
		},
	};

	let data = await db
		.collection("users")
		.updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);

	response.json(data);
});

userRoutes.route("/users/:id").delete(async (request, response) => {
	let db = database.getDb();
	let data = await db
		.collection("users")
		.deleteOne({ _id: new ObjectId(request.params.id) }, mongoObject);

	response.json(data);
});

userRoutes.route("/users/login").post(async (request, response) => {
	let db = database.getDb();
	console.log(request.body.email);
	const user = await db.collection("users").findOne({ email: request.body.email });

	if (user) {
		let confirmation = await bcrypt.compare(request.body.password, user.password);
		if (confirmation) {
			const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1hr" });
			response.json({ success: true, token });
		} else {
			response.json({
				success: false,
				message: "incorrect password",
			});
		}
	} else {
		response.json({
			success: false,
			message: "no user found with this email",
		});
	}
});

module.exports = userRoutes;
