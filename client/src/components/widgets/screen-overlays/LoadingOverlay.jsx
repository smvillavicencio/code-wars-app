/* eslint-disable */ 
import { Box, CircularProgress, Typography } from '@mui/material';

import Overlay from './Overlay';


/**
 * Purpose: Displays overlay for loading screen.
 * Params: None
 */
const LoadingOverlay =() =>{
	return (
		<Box sx={{ zIndex: 1650 }}>
			<Overlay
				icon={
					<CircularProgress color="white" />
				}
				text={null
					// <Typography 
					// 	variant="body1"
					// 	sx={{
					// 		whiteSpace: 'pre-wrap',
					// 		textAlign: 'center'
					// 	}}
					// >
					// 	Loading...
					// </Typography>
				}
			/> 
		</Box>
	);
};

export default LoadingOverlay;