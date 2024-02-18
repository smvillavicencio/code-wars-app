/* eslint-disable */
import {
	Box,
	Button,
	Typography
} from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WestIcon from '@mui/icons-material/West';
import { useEffect, useState } from "react";

import { DropdownSelect } from "components";

// dummy data for list of teams
const teamsList = [
	'Team 1',
	'Team 2',
	'Team 3',
	'Team 4',
	'Team 5',
	'Team 6',
	'Team 7',
	'Team 8',
	'Team 9',
	'Team 10',
];


/** 
 * Purpose: This component displays the details of the specific power-up selected.
 * Params:
 * 		<String>		type - receives the type of power-up clicked.
 *    <Boolean>   open - tells whether to 
 *    <Object> 		powerUp - state containing the details about the power-up selected.
 */
const PowerUpDetails = ({
	type,
	handleReturn,
	powerUp
}) => {
	const [selectedTeam, setSelectedTeam] = useState('');


	/**
	 * Purpose: Apply the debuff to the selected team.
	 * Params: newDebuff - debuff name
	 */
	const applyDebuff = (newDebuff) => {
		console.log(selectedTeam)
		
		// insert endpoint for applying debuff

		setSelectedTeam(null);
		handleReturn();
	};

	/**
	 * Purpose: Reset the selected target team and go back to debuff list.
	 */
	const handleBackDebuff = () => {
		setSelectedTeam(null);
		handleReturn();
	};

  return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				cursor: 'pointer',
				color: 'white.main',
				bgcolor: 'rgba(0, 10, 30, 3)',
				boxShadow: 'inset 0px 5px 5px -5px rgba(0,0,0,0.5)',
			}}
		>
			{/* Subcontainer */}
			<Box sx={{ width: '80%', display: 'flex', flexDirection: 'column' }} >
				
				{/* Return button */}
				<Button
					onClick={handleBackDebuff}
					variant="contained"
					sx={{
						bgcolor: 'rgba(0, 0, 10, 1)',
						width: '100px',
						marginBottom: '20px',
						'&:hover': {
							bgcolor: 'rgba(30, 40, 50, 1)',
						},
					}}
				>
					<WestIcon
						sx={{
							width: '20px',
							height: '20px',
							color: 'rgba(255, 255, 255, 0.5)',
						}}
					/>

					<Typography
						sx={{
							fontWeight: '60px',
							fontSize: '12px',
							color: 'rgba(255, 255, 255, 0.5)',
							marginLeft: '5px',
						}}
					>
						Back
					</Typography>
				</Button>

				{/* Power-up name */}
				<Typography
					variant="h6"
					component="h6"
					sx={{
						marginBottom: '10px',
					}}
				>
					{powerUp.name}
				</Typography>
				
				{/* Power-up description */}
				<Typography
					sx={{
						fontSize: '13px',
						color: 'rgba(255, 255, 255, 0.5)',
						fontWeight: '20px',
						marginBottom: '20px',
					}}
				>
					{powerUp.fullDescription}
				</Typography>
				
				{/* Power-up cost */}
				<Typography
					sx={{
						fontSize: '13px',
						color: 'rgba(255, 255, 255, 0.5)',
						fontWeight: '20px',
						marginBottom: '20px',
					}}
				>
					Cost: {powerUp.Cost}
				</Typography>
				
				{type === "debuff" ?
					// Debuffs should have ui elements that allow the participants to select an enemy team to inflict the power-up on.
					<>
						{/* Select team dropdown select */}
						<DropdownSelect
							isDisabled={false}
							label="Select Team"
							minWidth="100%"
							options={teamsList}
							onClick={(e) => {setSelectedTeam(e.target.value)}}
						/>

						{/* Button to inflict the debuff */}
						<Button
							onClick={() => applyDebuff(powerUp.name)}
							disabled={selectedTeam? true: false}
							// variant="contained"
							sx={{
								marginBottom: '20px',
								marginTop: '20px',
								height: '40px',
								fontSize: '14px',
								// bgcolor: 'rgba(255, 255, 255, 0.1)', for disabled
							}}
						>
							Inflict debuff to {selectedTeam ? <>{selectedTeam.name}</> : <> enemy</>}
						</Button>

					</> :
					// Buffs only have the buy button					
					<>
						{/* Buy button */}
						<Button
							variant="contained"
							sx={{
								marginBottom: '20px',
							}}
						>
							<ShoppingCartIcon sx={{ margin: '5px' }} />
								BUY
						</Button>
					</>
				}
			</Box>
		</Box>
  )
};

export default PowerUpDetails;