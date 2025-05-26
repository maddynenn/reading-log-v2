import { useEffect } from "react";
import { useState } from "react";
import { getAllBookEntries } from "../src/api";
import { EntryCard } from "../src/components/EntryCard";

export function MyBooks() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadAllBookEntries() {
			const data = await getAllBookEntries();
			setBooks(data);
		}

		loadAllBookEntries();
	}, []);

	return (
		<>
			<h1>MyBooks</h1>
			<div>
				{books.map((book) => {
					return <EntryCard entry={book}></EntryCard>;
				})}
			</div>
		</>
	);
}
