import Overlay from "./Overlay";
import { Typography } from "@mui/material";
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';


/**
 * Purpose: Displays timer overlay for debuffs
 * Params: None
 */
const TimerOverlay =() =>{
	return (
		<Overlay
			icon={<TimerTwoToneIcon
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
				00:00
			</Typography>}
		/> 
	)
}

export default TimerOverlay;