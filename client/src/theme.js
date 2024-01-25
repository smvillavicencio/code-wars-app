// This is the theme for the entire app.

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        // buttons
        primary: {
            main: "#2c3e6b",
        },
        secondary: {
            main: "#640b25",

            // disabled
            light: "#ffc1d3"
        },
        major: {
            main: "#009fac",

            // disabled
            light: "#c9d1e7"
        },

        // frosted background
        frost: {
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
            main: "#ffffff"
        },
	},

    typography: {
        // topbar header
        h2: {
            fontFamily: "Poppins",
            fontWeight: "600"
        },

        // topbar subtitle
        h4: {
            fontFamily: "Poppins",
            fontWeight: "400"
        },

        // buttons/other titles
        h5: {
            fontFamily: "Poppins",
            fontWeight: "500",
        },

        // column names
        h6: {
            fontFamily: "Inter",
            fontWeight: "600",
        },

        // general text
        body1: {
            fontFamily: "Inter",
            fontWeight: "400"
        }
	},
});