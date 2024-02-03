import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// This is the theme for the entire app.
let customTheme = createTheme({
	components: {
		MuiSwitch: {
			styleOverrides: {
				root: {
					paddingLeft: 0.5,
					width: 65,
					height: 40,
				},
				thumb: {
					width: 23,
					height: 23,
				},
				switchBase: {
					// Controls default (unchecked) color and position for the thumb
					color: "#fff",
					transform: "translateX(-9px)",
				},
				colorPrimary: {
					"&.Mui-checked": {
						// Controls checked color and position for the thumb
						color: "#ef346a",
						transform: "translateX(25px)",
					}
				},
				track: {
					// Controls default (unchecked) color for the track
					opacity: 0.5,
					backgroundColor: "#fff",
					".Mui-checked.Mui-checked + &": {
						// Controls checked color for the track
						opacity: 0.6,
						backgroundColor: "#ffc1d3"
					}
				}
			}
		}
	},
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

		// larger body of text
		h6: {
			color: "#e5ebff",
			fontFamily: "Inter",
			fontWeight: "500",
		},

		// general text
		body1: {
			color: "#212226",
			fontFamily: "Inter",
			fontWeight: "400"
		},
	},
});

export const theme = responsiveFontSizes(customTheme);