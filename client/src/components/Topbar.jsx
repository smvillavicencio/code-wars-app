/* Context */
import { theme } from "../theme";

/* Material UI */
import {
	AppBar,
	Container,
	Toolbar,
	ThemeProvider,
	Typography,
} from "@mui/material";

/**
 * Explain what the component is for
 */
const TopBar = () => {
	return (
		<ThemeProvider theme={theme}>
			<AppBar component="nav" color="frost">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* App Name */}
						<Typography
							noWrap
							component="div"
							sx={{
								display: { xs: "none", md: "block" },
							}}
						>
							App Name
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default TopBar;