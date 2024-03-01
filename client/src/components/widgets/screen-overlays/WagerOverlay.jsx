/* eslint-disable */ 
import { Button, FormControl, TextField, Typography } from '@mui/material';

import Overlay from './Overlay';


/**
 * Purpose: Displays wager screen overlay
 * Params: None
 */
const WagerOverlay = () => {
	return (
		<Overlay
			
			text={<Typography 
				variant="h4"
				sx={{
					whiteSpace: 'pre-wrap',
					textAlign: 'center'
				}}
				className="fOverlay"
			>
				Enter your bet for Wager Round
			</Typography>}

			body={<FormControl>
				<TextField 
					type='number' 
					variant='outlined' 
					sx={{
						background: 'white'
					}}
					className='fOverlay'
				/>

				<Button variant="filled" color="primary" type="submit">Submit</Button>
			</FormControl>}
		/> 
	);
};

export default WagerOverlay;