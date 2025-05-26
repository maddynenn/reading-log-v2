export function formatDate(date) {
	date = new Date(date);
	let dateString = date.toString(date);
	return dateString.slice(4, 15);
}
