import {
	AppBar,
	Box,
	Button,
	Toolbar,
	Typography,
} from "@mui/material";
import seal from "../../assets/UPLB COSS.png";



const TopBar = () => {
	return (
		<AppBar
			color="glass"
			sx={{
				backgroundColor: "rgba(179,179,179,0.25)",
				boxShadow: "10px 10px 10px rgba(30,30,30,.1)",
				backdropFilter: "blur(4px)",
				position: "static",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						py: 1,
						gap: 3,
					}}
				>
					<img
						src={seal}
						alt="UPLB COSS Seal"
						style={{
							maxWidth: "75px",
							maxHeight: "75px",
						}}
					/>
					<Box>
						<Typography noWrap variant="h4">
							<span>Code Wars</span>
						</Typography>
						<Typography noWrap variant="h5">
							<span>UPLB Computer Science Society</span>
						</Typography>
					</Box>
				</Box>

				<Button
					variant="contained"
					color="primary"
					size="large"
					sx={{
						'&:hover': {
							bgcolor: "major.light", // Background color on hover
							color: "general.main",
						}
					}}
				>
					BUY POWER-UP
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;