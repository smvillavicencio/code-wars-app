/* eslint-disable */ 
import { Paper } from '@mui/material';


/*
 * Purpose: Displays an item in the carousel component for sponsors.
 * Params: <Object> logo - contains the company logo and name to be displayed
 */
const Item = ({ logo }) => {

	return (
		<Paper
			sx={{
				backgroundColor: 'rgba(255,255,255,0)',
				boxShadow: '10px 10px rgba(0,0,0,0)',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<img
				src={logo.image}
				alt={logo.title}
				style={{
					width: '130px',
					height: '130px',
				}}
			/>
		</Paper>
	);
};

export default Item;