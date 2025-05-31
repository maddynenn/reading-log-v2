import axios from "axios";

const URL = "http://localhost:8000";

export async function getAllBookEntries() {
	const response = await axios.get(`${URL}/bookEntries`);
	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function getOneBookEntry(id) {
	id = id.slice(1, id.length);
	const response = await axios.get(`${URL}/bookEntries/${id}`);
	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function createBookEntry(bookEntry) {
	const response = await axios.post(`${URL}/bookEntries`, bookEntry);

	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function updateBookEntry(id, bookEntry) {
	const response = await axios.put(`${URL}/bookEntries/${id}`, bookEntry);

	if (response.status == 200) {
		return response.data;
	} else {
		return;
	}
}

export async function deleteBookEntry(id) {
	const response = await axios.delete(`${URL}/bookEntries/${id}`);

	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function getAllUsers() {
	const response = await axios.get(`${URL}/users`);

	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function getOneUser(id) {
	const response = await axios.get(`${URL}/users/${id}`);

	if (response.status === 200) {
		return response.data;
	} else {
		return;
	}
}

export async function createUser(user) {
	console.log("aqui" + user.firstName);
	const response = await axios.post(`${URL}/users`, user);

	return response;
}

export async function updateUser(id) {
	const resposne = await axios.put(`${URL}/users/${id}`);

	return response;
}

export async function deleteUser(id) {
	const response = await axios.delete(`${URL}/users/${id}`);

	return response;
}

export async function verifyUser(user) {
	const response = await axios.post(`${URL}/users/login`, user);

	if (response.data.success) {
		console.log("success!" + response.data);
		return response.data.token;
	} else {
		console.log("failed here: " + response.data.message);
		return;
	}
}
