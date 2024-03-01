/* eslint-disable */ 
import { Paper } from '@mui/material';


/**
 * Purpose: Displays an item in the carousel component for sponsors.
 * Params: <Object> logo - contains the company logo and name to be displayed
 */
const Item = ({ logo }) => {

	return (
		<Paper
			sx={{
				width:'100%',
				backgroundColor: 'rgba(255,255,255,0)',
				boxShadow: '10px 10px rgba(0,0,0,0)',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Paper
				sx={{
					display: 'flex',
					width: '60%',
					height: '10vh',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(255,255,255,0)',
					boxShadow: '10px 10px rgba(0,0,0,0)',
				}}
			>
				<img
					src={logo.image}
					alt={logo.title}
					style={{
						maxWidth: '100%',
						maxHeight:'100%',
						width: 'auto',
						height: 'auto',
					}}
				/>
			</Paper>
		</Paper>
	);
};

export default Item;