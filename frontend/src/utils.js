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

export function booksThisYear(books) {
	let bty = [];

	if (!books || books.length === 0) {
		return bty;
	}

	const today = new Date();
	books.forEach((entry) => {
		const entryDate = new Date(entry.dateCreated);
		if (entryDate.getFullYear() == today.getFullYear()) {
			bty.push(entry);
		}
	});
	return bty;
}

export function findFirstMostRecent(books) {
	if (!books || books.length === 0) {
		return null;
	}

	let mostRecent = books[0];

	books.forEach((entry) => {
		if (entry.dateCreated > mostRecent.dateCreated) {
			mostRecent = entry;
		}
	});

	return mostRecent;
}

export function findSecondMostRecent(books) {
	if (!books || books.length === 1) {
		return null;
	}

	const first = findFirstMostRecent(books);

	let mostRecent;

	if (books[0] !== first) {
		mostRecent = books[0];
	} else {
		mostRecent = books[1];
	}

	books.forEach((entry) => {
		if (entry.dateCreated > mostRecent.dateCreated && entry !== first) {
			mostRecent = entry;
		}
	});

	return mostRecent;
}

export function findThirdMostRecent(books) {
	if (!books || books.length === 2) {
		return null;
	}

	const first = findFirstMostRecent(books);
	const second = findSecondMostRecent(books);

	let mostRecent;

	if (books[0] !== first && books[0] !== second) {
		mostRecent = books[0];
	} else if (books[1] !== first && books[1] !== second) {
		mostRecent = books[1];
	} else {
		mostRecent = books[2];
	}

	books.forEach((entry) => {
		if (entry.dateCreated > mostRecent.dateCreated && entry !== first && entry !== second) {
			mostRecent = entry;
		}
	});

	return mostRecent;
}

export function mostCommonGenre(books) {
	if (!books || books.length === 0) {
		return { genre: null, percent: 0 };
	}

	let max = 1;
	let mostCommon = books[0].genre;

	books.forEach((entry) => {
		const thisGenre = entry.genre;
		let newMax = 0;
		books.forEach((entry) => {
			if (entry.genre === thisGenre) {
				newMax = newMax + 1;
			}
		});

		if (newMax > max) {
			max = newMax;
			mostCommon = entry.genre;
		}
	});

	let percentage = (max / books.length) * 100;
	percentage = Math.trunc(percentage);

	return { genre: mostCommon, percent: percentage };
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
