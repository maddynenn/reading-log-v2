import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { InfoCard } from "../src/components/InfoCard";
import { EntryCard } from "../src/components/EntryCard";
import { PercentageProgressBar } from "../src/components/PercentageProgressBar";
import {
	booksThisYear,
	calculateBooksReadThisMonth,
	calculateOverallAverageRating,
	calculatePagesReadThisMonth,
	calculateTotalBooksRead,
	calculateTotalPagesRead,
	findFirstMostRecent,
	findSecondMostRecent,
	findThirdMostRecent,
	mostCommonGenre,
} from "../src/utils";
import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import { getAllBookEntries } from "../src/api";
import { commonStyles, spacing } from "../theme";

export function Home() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadAllBookEntries() {
			const token = sessionStorage.getItem("User");
			const decodedUser = jwt_decode.jwtDecode(token);
			const data = await getAllBookEntries();
			const filteredData = data.filter((entry) => entry.user === decodedUser._id);
			setBooks(filteredData);
		}

		loadAllBookEntries();
	}, []);

	function starsToDisplay(rating) {
		const stars = [];
		for (let index = Math.trunc(rating); index > 0; index--) {
			stars.push(<StarIcon key={index} />);
		}
		return stars;
	}

	return (
		<Box sx={commonStyles.pageContainer}>
			{/* header */}
			<Box sx={commonStyles.pageHeader}>
				<Typography variant="h1">Home</Typography>
			</Box>

			{/* stats section */}
			<Box sx={commonStyles.contentSection}>
				<Box sx={commonStyles.statsGrid}>
					<InfoCard title="Books Read This Month" value={calculateBooksReadThisMonth(books)} subtitle="books" />
					<InfoCard title="Pages Read This Month" value={calculatePagesReadThisMonth(books)} subtitle="pages" />
					<InfoCard title="Total Books Read" value={calculateTotalBooksRead(books)} subtitle="books" />
					<InfoCard title="Total Pages Read" value={calculateTotalPagesRead(books)} subtitle="pages" />
				</Box>
			</Box>

			{/* divider */}
			<Box sx={commonStyles.dividerLine} />

			{/* recently finished section */}
			<Box sx={commonStyles.contentSection}>
				<Typography variant="h2" sx={{ mb: spacing.md }}>
					Recently Finished
				</Typography>

				<Box sx={commonStyles.booksGrid}>
					{findFirstMostRecent(books) && <EntryCard entry={findFirstMostRecent(books)} />}
					{findSecondMostRecent(books) && <EntryCard entry={findSecondMostRecent(books)} />}
					{findThirdMostRecent(books) && <EntryCard entry={findThirdMostRecent(books)} />}
				</Box>
			</Box>

			{/* divider */}
			<Box sx={commonStyles.dividerLine} />

			{/* reading insights section */}
			<Box sx={commonStyles.contentSection}>
				<Typography variant="h2" sx={{ mb: spacing.md }}>
					Reading Insights
				</Typography>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
						gap: spacing.md,
					}}
				>
					{/* most read genre card */}
					<Box sx={commonStyles.infoCard}>
						<Typography variant="h6" sx={{ mb: spacing.sm }}>
							Most Read Genre
						</Typography>
						<PercentageProgressBar category={mostCommonGenre(books).genre} value={mostCommonGenre(books).percent} />
					</Box>

					{/* average rating card */}
					<Box sx={commonStyles.infoCard}>
						<Typography variant="h6" sx={{ mb: spacing.sm }}>
							Average Overall Rating
						</Typography>
						<Box sx={commonStyles.flexStart}>
							<Typography variant="body1" sx={{ mr: 1 }}>
								{calculateOverallAverageRating(books)} stars
							</Typography>
							<Box sx={commonStyles.flexStart}>{starsToDisplay(calculateOverallAverageRating(books))}</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
