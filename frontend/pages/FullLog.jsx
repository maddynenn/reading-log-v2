import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBookEntry } from "../src/api";

export function FullLog() {
	const [entry, setEntry] = useState({});
	let params = useParams();
	const navigate = useNavigate();
	let id = params.id;

	useEffect(() => {
		async function loadEntry() {
			console.log(id);
			let data = await getOneBookEntry(id);
			setEntry(data);
		}
		loadEntry();
	}, [id]);

	return (
		<>
			<h1>Log</h1>
			<h2>{entry.title}</h2>
		</>
	);
}
