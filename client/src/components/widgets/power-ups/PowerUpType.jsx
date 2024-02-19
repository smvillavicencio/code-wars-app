/* eslint-disable */ 
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Toolbar } from '@mui/material';


/**
 * Purpose: This component displays the collapsible ui element for one type of power-up.
 * Params:
 *    <Boolean>   seePowerups - tells whether to expand the collapsible ui element
 *    <String>    label - text for power-up type
 *    <Function>  handleClick - handle click event for collapsible
 */
const PowerUpType = ({ seePowerups, label, handleClick }) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				cursor: 'pointer',
				color: 'white.main',

				'&:hover': {
					bgcolor: 'rgba(255, 255, 255, 0.05)',
					color: 'major.main',
				},
			}}
			onClick={handleClick}
		>
			{/* Subcontainer for the Buff title and arrow icon */}
			<Toolbar
				sx={{
					width: '80%',
					justifyContent: 'space-between',
					fontFamily: 'Inter',
					fontWeight: '500',
					fontSize: '18px',
				}}
			>
				{/* Buff title */}
				{label}

				{/* Arrow Icons
          - points upwards if not showing the list of buffs
          - points downwards if showing the list of buffs
        */}
				{ seePowerups ? (
					<KeyboardArrowUpIcon sx={{ width: '25px', height: '25px', transform: 'rotate(180deg)' }} />
				) : (
					<KeyboardArrowUpIcon sx={{ width: '25px', height: '25px' }} />
				)}
			</Toolbar>
		</Box>
	);
};

export default PowerUpType;