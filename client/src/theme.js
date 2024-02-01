import { createTheme } from "@mui/material/styles";

// This is the theme for the entire app.

export const theme = createTheme({
	palette: {
		// buttons
		primary: {
			contrastText: "#e5ebff",
			main: "#2c3e6b",
		},
		secondary: {
			contrastText: "#e5ebff",
			main: "#640b25",

			// disabled
			light: "#ffc1d3"
		},
		major: {
			contrastText: "#e5ebff",
			main: "#009fac",

			// disabled
			light: "#c9d1e7"
		},

		// glass background
		glass: {
			main: "#b3b3b3",
		},

		// text
		general: {
			main: "#212226",
		},
		columns: {
			main: "#707070",
		},
		tableHover: {
			main: "#ededed",
		},
		white: {
			main: "#e5ebff"
		},
	},

	typography: {
		// timer countdown
		h2: {
			color: "#e5ebff",
			fontFamily: "Inter",
			fontWeight: 400,
		},

		// topbar header
		h4: {
			color: "#e5ebff",
			fontFamily: "Poppins",
			fontWeight: "600"
		},

		// topbar subtitle / timer title / buttons / other titles
		h5: {
			color: "#e5ebff",
			fontFamily: "Poppins",
			fontWeight: "400",
		},

		// column names
		h6: {
			color: "#707070",
			fontFamily: "Inter",
			fontWeight: "600",
		},

		// general text
		body1: {
			color: "#212226",
			fontFamily: "Inter",
			fontWeight: "400"
		}
	},
});