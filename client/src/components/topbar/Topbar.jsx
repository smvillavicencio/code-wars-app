/* Material UI */
import {
	AppBar,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";


/**
 * Explain what the component is for
 */
const TopBar = () => {
	return (
		<AppBar
			component="nav"
			color="glass"
			sx={{
				backgroundColor: "rgba(179,179,179,0.25)",
        boxShadow: "10px 10px 10px rgba(30,30,30,.1)",
				backdropFilter: "blur(4px)",
				position:"static",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* App Name */}
					<Typography
						// noWrap
						variant="h4"
					>
						Name
					</Typography>
					{/* Subtitle */}
					<Typography
						// noWrap
						variant="h5"
					>
						Subtitle
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default TopBar;