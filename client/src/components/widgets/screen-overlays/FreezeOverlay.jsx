/* eslint-disable */ 
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import { Typography } from '@mui/material';

import Overlay from './Overlay';


/**
 * Purpose: Displays frozen screen overlay
 * Params: None
 */
const FreezeOverlay = () => {
	return (
		<Overlay
			icon={<HourglassFullTwoToneIcon
				style={{
					fontSize: '10rem',
					alignSelf: 'center',
				}}
				// sx={{
				// 	"@keyframes spin": {
				// 		"0%": {
				// 			transform: "rotate(360deg)",
				// 		},
				// 		"100%": {
				// 			transform: "rotate(0deg)",
				// 		},
				// 	},
				// 	animation: "spin 2.5s linear infinite",
				// }}
				className="fOverlay"
			/>}
			text={<Typography 
				variant="h4"
				sx={{
					whiteSpace: 'pre-wrap',
					textAlign: 'center'
				}}
				className="fOverlay"
			>
				
				Your screen has been frozen. <br/>
				Please Wait.
			</Typography>}
		/> 
	);
};

export default FreezeOverlay;