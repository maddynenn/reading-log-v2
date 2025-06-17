const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const bookEntries = require("./bookEntryRoutes");
const users = require("./userRoutes");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(bookEntries);
app.use(users);

console.log("Server starting...");
console.log("Environment variables check:", {
	ATLAS_URI: process.env.ATLAS_URI ? "Set" : "Not set",
	SECRET_KEY: process.env.SECRET_KEY ? "Set" : "Not set",
});

app.listen(PORT, () => {
	connect.connectToServer();
	console.log(`Server is running on port ${PORT}`);
});
