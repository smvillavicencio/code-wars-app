import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import {
	AppBar,
	Box,
	Button,
	Toolbar,
	Typography,
} from "@mui/material";



const TopBar = ({
	isImg,
	icon,
	title,
	subtitle,
	buttonText,
	startIcon,
	handleButton
}) => {
	const [image, setImage] = useState(true)

	// set image upon component mount
	useEffect(() => { 
		setImage(isImg);	
	}, []);

	return (
		<AppBar
			color="glass"
			sx={{
				backgroundColor: "rgba(179,179,179,0.25)",
				boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
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
					{/* override default attributes of figure tag */}
					<figure
						style={{
							padding: 0,
							margin: 0,
							border: 0,
							margin: 'auto',
						}}
					>
						{image ? 
							<img
								src={icon}
								style={{
									maxWidth: "75px",
									maxHeight: "75px",
								}}
							/> :
							<div style={{ fontSize:"50", color: "white" }}>{icon}</div>
						}
					</figure>
					
					<Box>
						<Typography noWrap variant="h4">
							<span>{title}</span>
						</Typography>
						<Typography noWrap variant="h5">
							<span>{subtitle}</span>
						</Typography>
					</Box>
				</Box>

				<Button
					variant="contained"
					color="major"
					size="large"
					startIcon={ startIcon? <>{startIcon}</> : <></> }
					sx={{
						minWidth: 30,
						'&:hover': {
							bgcolor: "major.light",
							color: "general.main",
						}
					}}
				>
					{buttonText}
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;