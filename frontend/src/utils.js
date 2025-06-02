export function formatDate(date) {
	date = new Date(date);
	let dateString = date.toString(date);
	return dateString.slice(4, 15);
}

export function calculateTotalPagesRead(books) {
	const total = books.reduce((sum, book) => {
		const newSum = sum + book.pages;
		console.log(newSum);
		return newSum;
	}, 0);

	console.log(total);
	return total;
}

export function calculatePagesReadThisMonth(books) {
	const total = books.reduce((sum, book) => {
		const today = new Date();
		const todaysMonth = today.getMonth();
		const todaysYear = today.getFullYear();
		const bookDate = new Date(book.dateCreated);
		const bookMonth = bookDate.getMonth();
		const bookYear = bookDate.getFullYear();
		let newSum = sum;
		if (
			((todaysMonth - bookMonth === 1 || todaysMonth - bookMonth === 0) &&
				todaysYear === bookYear) ||
			(todaysYear - bookYear === 1 && todaysMonth === 1 && bookMonth === 12)
		) {
			newSum = sum + book.pages;
		}
		console.log(newSum);
		return newSum;
	}, 0);

	return total;
}
