import Overlay from "./Overlay";
import { Typography } from "@mui/material";
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';


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
					alignSelf: 'center'
				}}
			/>}
			text={<Typography 
				variant="h4"
				sx={{
					whiteSpace: 'pre-wrap',
					textAlign: 'center'
				}}
			>
				
				Your screen has been frozen. <br/>
				Please Wait.
			</Typography>}
		/> 
	)
}

export default FreezeOverlay;