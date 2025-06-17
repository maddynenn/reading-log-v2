import Box from "@mui/material/Box";
import { InfoCard } from "../src/components/InfoCard";
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
import { EntryCard } from "../src/components/EntryCard";
import Typography from "@mui/material/Typography";
import { ProgressWithLabel } from "../src/components/ProgressWithLabel";
import { PercentageProgressBar } from "../src/components/PercentageProgressBar";
import StarIcon from "@mui/icons-material/Star";

export function Home() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadAllBookEntries() {
			const token = sessionStorage.getItem("User");
			const decodedUser = jwt_decode.jwtDecode(token);
			const data = await getAllBookEntries();
			const filteredData = data.filter((entry) => entry.user === decodedUser._id);
			setBooks(filteredData);
			console.log(filteredData);
		}

		loadAllBookEntries();
	}, []);

	function starsToDisplay(rating) {
		const stars = [];

		for (let index = Math.trunc(rating); index > 0; index--) {
			stars.push(<StarIcon></StarIcon>);
		}
		console.log("ahem");
		return stars;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "flex-start",
					borderBottom: 1,
					marginLeft: 1,
				}}
			>
				<Typography fontSize={30}>Home</Typography>
			</Box>

			<Box
				sx={{
					width: "100%",
					height: "1px",
					background:
						"linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
					my: 2,
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					//bgcolor: "yellow",
					borderWidth: "1px",
					width: "95vw",
					//borderBottom: 1,
					//borderTop: 1,
					//borderColor: "black",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%",
						//minWidth: "200px",
					}}
				>
					<InfoCard
						title="Books Read This Month"
						value={calculateBooksReadThisMonth(books)}
						subtitle="books"
					/>
					<InfoCard
						title="Pages Read This Month"
						value={calculatePagesReadThisMonth(books)}
						subtitle="pages"
					/>
					<InfoCard
						title="Total Books Read"
						value={calculateTotalBooksRead(books)}
						subtitle="books"
					/>
					<InfoCard
						title="Total Pages Read"
						value={calculateTotalPagesRead(books)}
						subtitle="pages"
					></InfoCard>
				</Box>
				<Box //divider line
					sx={{
						width: "100%",
						height: "1px",
						background:
							"linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
						my: 2,
					}}
				/>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "black",
						margin: 1,
						marginY: 2,
					}}
				>
					<Typography>Recently Finished</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						//alignItems: "center",
						width: "98%",
					}}
				>
					<Box
						sx={{
							paddingX: 1,
						}}
					>
						{findFirstMostRecent(books) ? (
							<EntryCard entry={findFirstMostRecent(books)}></EntryCard>
						) : (
							<></>
						)}
					</Box>
					<Box
						sx={{
							paddingX: 1,
						}}
					>
						{findSecondMostRecent(books) ? (
							<EntryCard entry={findSecondMostRecent(books)}></EntryCard>
						) : (
							<></>
						)}
					</Box>
					<Box
						sx={{
							paddingX: 1,
						}}
					>
						{findThirdMostRecent(books) ? (
							<EntryCard bgcolor={"yellow"} entry={findThirdMostRecent(books)}></EntryCard>
						) : (
							<></>
						)}
					</Box>
				</Box>
				<Box //divider line
					sx={{
						width: "100%",
						height: "1px",
						background:
							"linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
						my: 2,
					}}
				/>
				<Box width={"100%"}>
					<Box>
						<Box>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: "black",
									margin: 1,
									marginY: 2,
									display: "flex",
									width: "10.5%",
								}}
							>
								<Typography>Reading Insights</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-start",
							width: "100%",
						}}
					>
						<Box
							sx={{
								bgcolor: "#cdffcc",
								paddingX: 2,
								paddingTop: 1,
								borderRadius: "8px",
								boxShadow: 2,
								marginX: 2,
								width: "250px",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<Typography>Most Read Genre</Typography>
							<PercentageProgressBar
								category={mostCommonGenre(books).genre}
								value={mostCommonGenre(books).percent}
							></PercentageProgressBar>
						</Box>
						<Box
							sx={{
								bgcolor: "#cdffcc",
								paddingX: 2,
								paddingTop: 1,
								borderRadius: "8px",
								boxShadow: 2,
								marginX: 2,
								width: "250px",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<Typography>Average Overall Rating</Typography>
							<p>{calculateOverallAverageRating(books)} stars</p>
							<Box>{starsToDisplay(calculateOverallAverageRating(books))}</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
