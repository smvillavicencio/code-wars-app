
/* eslint-disable */ 
import { useContext, useEffect, useState } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WestIcon from '@mui/icons-material/West';
import {
	Box,
	Button,
	Typography
} from '@mui/material';

import {
	ConfirmWindow,
	DropdownSelect,
	SuccessWindow
} from 'components';
// import { teamsList } from 'utils/dummyData';
import { userDetailsContext } from 'utils/UserDetailsProvider';
import { getFetch } from 'utils/apiRequest';



/** 
 * Purpose: This component displays the details of the specific power-up selected.
 * Params:
 * 		<Int>				type - receives the type of power-up clicked.
 *    <Boolean>   open - tells whether to 
 *    <Object> 		powerUp - state containing the details about the power-up selected.
 */
const PowerUpDetails = ({
	type,
	handleReturn,
	powerUp
}) => {
	// state handler for selected team recipient for debuff
	const [selectedTeam, setSelectedTeam] = useState('');
	// state handler for teams list
	const [teams, setTeams] = useState([]);
	const [teamOptions, setTeamOptions] = useState([]);
	// state for the context API
	// const [userDetails, setUserDetails] = useContext(userDetailsContext);
	const [userDetails, setUserDetails] = useState();


	/**
	 * remove current user team from teamsList
	 */
	// useEffect(()=>{
	// 	let updatedTeams = teamsList.filter(object => {
	// 		return object !== userDetails.user
	// 	})
	// 	setTeams(updatedTeams)

	// }, [userDetails])
	const getAllTeams = async (user) => {
		try{
			const res = await getFetch("http://localhost:5000/teams");
			if(res.success){
				const updatedTeams = res.teams.filter(team => {
					return team._id !== user?._id;
				});

				const teamNamesArray = updatedTeams.map(team => team.team_name);

				setTeams(updatedTeams);
				setTeamOptions(teamNamesArray);
				setSelectedTeam(teamNamesArray[0]);
			} else {
				console.log(res.message);
				return [];
			}
		} catch (err) {
			console.log(err);
		}
	};
	// eto muna for use effect para di muna gamitin context api
	useEffect(() => {
		const user = JSON.parse(localStorage?.getItem("user"));

		getAllTeams(user);
		setUserDetails(user);
	}, []); 
	

	/**
	* Purpose: Sets state of selectedTeam.
	*/
	const handleTeams = (e) => {
		setSelectedTeam(e.target.value);
	};

	/**
	 * Purpose: Apply the debuff to the selected team.
	 * Params: newDebuff - debuff name
	 */
	const applyDebuff = (newDebuff) => {
		// console.log(selectedTeam)

		// ask for confirmation of action
		ConfirmWindow.fire({
			text: 'Are you sure you want to use '+`${newDebuff}`+' on '+`${selectedTeam}`+'?',
		}).then((res) => {
			if (res['isConfirmed']) {
				SuccessWindow.fire({
					text: 'Successfully used '+`${newDebuff}`+' on '+`${selectedTeam}`+'!'
				});
				// insert endpoint for applying debuff
				setSelectedTeam('');
				handleReturn();
			} else {
				return;
			}
		});
	};

	/**
	 * Purpose: Reset the selected target team and go back to debuff list.
	 */
	const handleBackDebuff = () => {
		setSelectedTeam('');
		handleReturn();
	};

	/**
	 * Purpose: Applying buff to user team
	 */
	const handleBuy = (buff) => {
		setSelectedTeam(userDetails.user);

		// ask for confirmation of action
		ConfirmWindow.fire({
			text: 'Are you sure you want to use '+`${buff}`+' on your team?',
		}).then((res) => {
			if (res['isConfirmed']) {
				SuccessWindow.fire({
					text: 'Successfully used '+`${buff}`+' on your team!'
				});
				// insert endpoint for applying buff
				setSelectedTeam('');
				handleReturn();
			} else {
				return;
			}
		});
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
					{powerUp.tier[Object.keys(powerUp.tier)[0]].description}
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
					Cost: { powerUp.code == "dispel" ? "120% of the cost of the dispelled debuff" : powerUp.code == "immune" && Object.keys(powerUp.tier)[0] == 4 ? "1000 + 10% of the team\’s current total points" : powerUp.tier[Object.keys(powerUp.tier)[0]].cost}
				</Typography>
				
				{type === 0 ?
					// Debuffs should have ui elements that allow the participants to select an enemy team to inflict the power-up on.
					<>
						{/* Select team dropdown select */}
						<DropdownSelect
							isDisabled={false}
							label="Team Name"
							minWidth="100%"
							variant="filled"
							options={teamOptions}
							handleChange={handleTeams}
							value={selectedTeam}
						/>

						{/* Button to inflict the debuff */}
						<Button
							onClick={() => applyDebuff(powerUp.name)}
							variant="contained"
							sx={{
								marginBottom: '20px',
								marginTop: '20px',
								height: '40px',
								fontSize: '14px',
							}}
						>
							Inflict debuff to {selectedTeam}
						</Button>
					</> :
					type === 1 && powerUp.code === 'dispel' ?
					<>
						{/* Select team dropdown select */}
						<DropdownSelect
							isDisabled={false}
							label="Debuffs"
							minWidth="100%"
							variant="filled"
							options={teamOptions}
							handleChange={handleTeams}
							value={selectedTeam}
						/>

						{/* Button to inflict the debuff */}
						<Button
							onClick={() => applyDebuff(powerUp.name)}
							variant="contained"
							sx={{
								marginBottom: '20px',
								marginTop: '20px',
								height: '40px',
								fontSize: '14px',
							}}
						>
							Dispel debuff to {selectedTeam}
						</Button>
					</> :
					// Buffs only have the buy button					
					<>
						{/* Buy button */}
						<Button variant="contained" onClick={() => handleBuy(powerUp.name)} sx={{ marginBottom: '20px' }} >
							<ShoppingCartIcon sx={{ margin: '5px' }} />
							BUY
						</Button>
					</>
				}
			</Box>
		</Box>
	);
};

export default PowerUpDetails;