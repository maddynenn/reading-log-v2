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
		const isInMonth = thisMonth(book.dateCreated);
		let newSum = sum;
		if (isInMonth) {
			newSum = sum + book.pages;
		}
		return newSum;
	}, 0);

	return total;
}

export function calculateTotalBooksRead(books) {
	const total = books.reduce((sum, book) => {
		return sum + 1;
	}, 0);
	return total;
}

export function calculateBooksReadThisMonth(books) {
	const total = books.reduce((sum, book) => {
		const isInMonth = thisMonth(book.dateCreated);
		if (isInMonth) {
			return sum + 1;
		} else {
			return sum;
		}
	}, 0);
	return total;
}

export function calculateOverallAverageRating(books) {
	const total = books.reduce((sum, book) => {
		return sum + book.overallRating;
	}, 0);

	return Math.trunc((total / calculateTotalBooksRead(books)) * 100) / 100;
}

function thisMonth(date) {
	const today = new Date();
	const todaysMonth = today.getMonth();
	const todaysYear = today.getFullYear();
	const bookDate = new Date(date);
	const bookMonth = bookDate.getMonth();
	const bookYear = bookDate.getFullYear();

	if (
		((todaysMonth - bookMonth === 1 || todaysMonth - bookMonth === 0) && todaysYear === bookYear) ||
		(todaysYear - bookYear === 1 && todaysMonth === 1 && bookMonth === 12)
	) {
		return true;
	} else {
		return false;
	}
}
