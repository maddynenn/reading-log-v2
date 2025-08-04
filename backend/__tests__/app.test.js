const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");

// mock database function returns
const mockDb = {
	collection: jest.fn(() => ({
		insertOne: jest.fn(() => Promise.resolve({ insertedId: "mock-id-123" })),
		find: jest.fn(() => ({ toArray: jest.fn(() => Promise.resolve([{}, {}])) })),
		findOne: jest.fn(() =>
			Promise.resolve({
				_id: "a3f8c92b4e7d5f61a9b0c4d3",
				title: "test book",
				author: "test author",
			})
		),
		updateOne: jest.fn(() => Promise.resolve({ modifiedCount: 1 })),
		deleteOne: jest.fn(() => Promise.resolve({ deletedCount: 1 })),
	})),
};

jest.mock("../connect", () => ({
	getDb: () => mockDb,
}));

// import routes
const bookEntryRoutes = require("../bookEntryRoutes");

// create a test authentication token for testing
const testToken = jwt.sign({ _id: "test-user-id" }, process.env.SECRET_KEY);

// testing bookEntry routes!
describe("Book Entry Routes", () => {
	let app;

	beforeAll(() => {
		app = express();
		app.use(express.json());
		app.use("/", bookEntryRoutes);
	});

	// POST
	it("should create a book entry", async () => {
		const bookData = {
			title: "Test Book",
			author: "Test Author",
			month: "Jan",
			yearPubl: 2023,
			genre: "Fiction",
			overallRating: 4,
			atmosphere: 5,
			plot: 4,
			writing: 4,
			worldBuilding: 3,
			characters: 5,
			emotion: 4,
			enjoyment: 5,
			format: "Paperback",
			pages: 300,
			dateCreated: new Date(),
			img: "http://example.com/cover.jpg",
		};

		const response = await request(app).post("/bookEntries").set("Authorization", `Bearer ${testToken}`).send(bookData);

		expect(response.status).toBe(200);
		expect(response.body.insertedId).toBe("mock-id-123");
	});

	// GET one
	it("should retrieve a single piece of data", async () => {
		const response = await request(app).get("/bookEntries/a3f8c92b4e7d5f61a9b0c4d3").set("Authorization", `Bearer ${testToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			_id: "a3f8c92b4e7d5f61a9b0c4d3",
			title: "test book",
			author: "test author",
		});
	});

	// GET all
	it("should retrieve all book entries in the database", async () => {
		const response = await request(app).get("/bookEntries").set("Authorization", `Bearer ${testToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual([{}, {}]);
	});

	//Google API
	it("should successfully retrieve a lot of data about a book from the Google Books API", async () => {
		const response = await request(app).get("/books/search").set("Authorization", `Bearer ${testToken}`).query({
			title: "Hard Times",
			author: "Charles Dickens",
			maxResults: 1,
		});

		console.log(response);
		expect(response.status).toBe(200);

		expect(response.body.items[0].id).toEqual("VVPmEAAAQBAJ");
	});
});
