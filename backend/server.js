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

app.listen(PORT, () => {
	connect.connectToServer();
	console.log(`Server is running on port ${PORT}`);
});
