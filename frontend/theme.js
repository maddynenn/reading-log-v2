// unified theme/styling for webapp
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
	palette: {
		primary: {
			main: "#37704c",
		},
		secondary: {
			main: "#cdffcc",
		},
	},
});

// Common styles object
export const commonStyles = {
	pageContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		minHeight: "100vh",
		padding: 3,
	},

	pageHeader: {
		borderBottom: 1,
		borderColor: "divider",
		marginBottom: 3,
		paddingBottom: 1,
	},

	contentSection: {
		marginBottom: 4,
	},

	infoCard: {
		bgcolor: "#cdffcc",
		padding: 2,
		borderRadius: 2,
		boxShadow: 2,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},

	entryCard: {
		bgcolor: "#37704c",
		color: "white",
		padding: 1,
		borderRadius: 1,
		boxShadow: 3,
		border: 1,
		borderColor: "divider",
		"&:hover": {
			bgcolor: "#152b1b",
		},
	},

	formContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
		maxWidth: 600,
	},

	statsGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: 2,
	},

	booksGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
		gap: 3,
	},

	dividerLine: {
		width: "100%",
		height: "1px",
		background: "linear-gradient(to right, transparent 0%, #a1ada1 20%, #a1ada1 80%, transparent 100%)",
		margin: "16px 0",
	},

	flexBetween: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	flexCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	flexStart: {
		display: "flex",
		alignItems: "flex-start",
	},
};

export const spacing = {
	xs: 1,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 5,
};
