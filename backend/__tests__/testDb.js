const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let mongoServer;
let connection;
let db;

// create a database specifically for testing
const connect = async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	connection = await MongoClient.connect(uri);

	db = connection.db();

	return { connection, db };
};

// function for closing that testing database
const closeDatabase = async () => {
	try {
		if (connection) {
			await connection.close();
			connection = null;
		}
		if (mongoServer) {
			await mongoServer.stop();
			mongoServer = null;
		}
	} catch (error) {
		console.error("Error closing test database:", error);
	}
};

// functions for clearing that database (used before each test)
// **NOT BEING USED IN CURRENT VERSION OF TESTS**
const clearDatabase = async () => {
	const collections = db.listCollections();
	for await (const collection of collections) {
		await db.collection(collection.name).deleteMany({});
	}
};

module.exports = {
	connect,
	closeDatabase,
	clearDatabase,
	getDb: () => db,
};
