/* eslint-disable */ 
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
					color: '#fff',
					transform: 'translateX(-9px)',
				},
				colorPrimary: {
					'&.Mui-checked': {
						// Controls checked color and position for the thumb
						color: '#ef346a',
						transform: 'translateX(25px)',
					}
				},
				track: {
					// Controls default (unchecked) color for the track
					opacity: 0.5,
					backgroundColor: '#fff',
					'.Mui-checked.Mui-checked + &': {
						// Controls checked color for the track
						opacity: 0.6,
						backgroundColor: '#ffc1d3'
					}
				}
			}
		}
	},
	breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
	palette: {
		// buttons
		primary: {
			contrastText: '#e5ebff',
			main: '#395395',
			light: '#c6d0ec',
		},
		secondary: {
			contrastText: '#e5ebff',
			main: '#8d2544',

			// disabled
			light: '#ffc1d3'
		},
		major: {
			contrastText: '#e5ebff',
			main: '#009fac',

			// disabled
			light: '#c9d1e7'
		},

		// glass background
		glass: {
			main: '#b3b3b3',
		},

		// text
		general: {
			main: '#212226',
		},
		columns: {
			main: '#707070',
		},
		tableHover: {
			main: '#ededed',
		},
		white: {
			main: '#e5ebff'
		},
	},
	typography: {
		// timer countdown
		h3: {
			color: '#e5ebff',
			fontFamily: 'Inter',
			fontWeight: 400,
			fontSize: "3rem",
      "@media (max-width:960px)": {
        fontSize: "2.4rem",
      },
      
      "@media (max-width:662px)": {
        fontSize: "2rem",
      },
      "@media (max-width:414px)": {
        fontSize: "1.7rem",
      },
		},

		// topbar header
		h4: {
			color: '#e5ebff',
			fontFamily: 'Poppins',
			fontWeight: '600',
			fontSize: "2.125rem",
      "@media (max-width:960px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
		},

		// topbar subtitle / timer title / buttons / other titles
		h5: {
			color: '#e5ebff',
			fontFamily: 'Poppins',
			fontWeight: '400',
			fontSize: "1.5rem",
      "@media (max-width:960px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
		},

		// larger body of text
		h6: {
			color: '#e5ebff',
			fontFamily: 'Inter',
			fontWeight: '500',
			fontSize: "1.25rem",
      "@media (max-width:960px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
		},

		// general text
		body1: {
			color: '#212226',
			fontFamily: 'Inter',
			fontWeight: '400',
			fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: ".9rem",
      },
		},

		body2: {
      fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
      "@media (max-width:480px)": {
        fontSize: ".97rem",
      },
    },
	},
});

export const theme = responsiveFontSizes(customTheme);