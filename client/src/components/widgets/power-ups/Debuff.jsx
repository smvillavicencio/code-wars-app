/* eslint-disable */ 

import { useState, useEffect } from 'react';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PanToolIcon from '@mui/icons-material/PanTool';
import WestIcon from '@mui/icons-material/West';
import { Box, Typography, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';


const debuffs = [
	{
		name: 'Stun',
		fulldescription: 'Target an opposing team, that team would be unable to make changes to their code for two (2) minutes upon its activation.',
		Cost: '100 points',
		duration: '2 minutes'
	},
	{
		name: 'Editor',
		fulldescription: 'Target an opposing team, that team would be unable to make changes to their code for two (2) minutes upon its activation.',
		Cost: '100 points',
		duration: '2 minutes'
	},
	{
		name: 'Frosty Hands',
		fulldescription: 'Target an opposing team, that team would be unable to make changes to their code for two (2) minutes upon its activation.',
		Cost: '100 points',
		duration: '2 minutes'
	}
];


const Debuff = ({showDebuffs, seeDetails, handleClickedPowerup, handleBack, powerUp}) => {

	const [teams, setTeams] = useState([
		{
			name: 'Team 1',
			buff: '',
			debuff: 'Frosty Hands',
		},
		{
			name: 'Team 2',
			buff: '',
			debuff: '',
		},
		{
			name: 'Team 3',
			buff: '',
			debuff: '',
		},
		{
			name: 'Team 4',
			buff: '',
			debuff: 'Stun',
		},
		{
			name: 'Team 5',
			buff: '',
			debuff: '',
		}
	]);

	// Target team to recieve the specific debuff
	const [selectedEnemy, setSelectedEnemy] = useState(null);

	// Teams to show using the pagination
	const [teamToShow, setTeamToShow] = useState([]);
	// Starting index of team to show
	const [start, setStart] = useState(0);
	// Last index of team to show
	const [end, setEnd] = useState(3);

	// Get the starting teams to show, from start (0) to end (3)
	useEffect(() => {
		setTeamToShow(teams.slice(start, end));
	}, [teams]);

	// Observe the change of buttons in pagination
	// Update the teams to show
	useEffect(() => {
		setTeamToShow(teams.slice(start, end));
	}, [start, end]);

	// Purpose: Update the starting and last index of teams to show
	// Params: Current event, and the current page (index) of the buttons
	// Returns: None
	const handlePageClick = (event, page) => {
		setEnd((page) * 3);
		setStart(((page) * 3) - 3);
	};

	// Purpose: Reset the Target team and go back to debuff list from specific debuff desciption
	// Params: None
	// Returns: None
	const handleBackDebuff = () => {
		setSelectedEnemy(null);
		handleBack();
	};

	// Purpose: Apply the debuff to the selected team
	// Params: Selected Team Name, and Debuff Name
	// Returns: None
	const applyDebuff = (selectedTeamName, newDebuff) => {

		// Find the selected team by its name
		const updatedTeams = teams.map(team => {
			if (team.name === selectedTeamName) {
				// Return a new object with updated debuff
				return { ...team, debuff: newDebuff };
			}
			return team;
		});
	
		// Update the state with the new array of teams
		setTeams(updatedTeams);
		setSelectedEnemy(null);
		handleBack();
	};

	return(
		<>
			{/* The List of Debuffs */}
			{
				showDebuffs && !seeDetails && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							bgcolor: 'rgba(0, 10, 30, 3)',
							gap: 2,
							paddingY: 3,
						}}
					>
						{/* Container for debuffs, clickable */}
						{
							debuffs.map((item, index) => (

								<Box
									key={index}
									sx={{
										width: '70%',
										display: 'flex',
										flexDirection: 'column',
										cursor: 'pointer',
										color: 'white.main',
									}}
									onClick={() => handleClickedPowerup(item)}
								>
									<Box
										key={index}
										sx={{
											bgcolor: 'rgba(255, 255, 255, 0.1)',
											width: '100%',
											boxShadow: 'inset 0px 5px 5px -5px rgba(0,0,0,0.5)',
											paddingY: 2,
											borderRadius: '50px',
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											'&:hover': {
												bgcolor: 'rgba(255, 255, 255, 0.2)',
											},
										}}
									>
										{/* Div that contains the debuff name, icon, and arrow icon */}
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
											}}
										>

											{/* Stun Icon */}
											{
												item.name.localeCompare('Stun') === 0 && (
													<ElectricBoltIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#85eeff',
														}}
													/>
												)
											}

											{/* Editor Icon */}
											{
												item.name.localeCompare('Editor') === 0 && (
													<LaptopChromebookIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#ff9cee',
														}}
													/>
												)
											}

											{/* Frosty Hands Icon */}
											{
												item.name.localeCompare('Frosty Hands') === 0 && (
													<PanToolIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#e7ffac',
														}}
													/>
												)
											}

											{/* Debuff name */}
											<Typography
												sx={{
													fontSize: '15px',
													color: 'white.main',
												}}
											>
												{item.name}
											</Typography>

										</Box>
										
										{/* Arrow icon */}
										<ArrowCircleRightIcon
											sx={{
												marginRight: '20px'
											}}
										/>
									</Box>
								</Box>
							))
						}

					</Box>
				)
			}

			{/* Specific Debuff selected to view, Main Div */}
			{
				showDebuffs && seeDetails && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'white.main',
							bgcolor: 'rgba(0, 10, 30, 3)',
							boxShadow: 'inset 0px 5px 5px -5px rgba(0,0,0,0.5)',
							paddingY: 2,
						}}
					>

						{/* Sub Div */}
						<Box
							sx={{
								width: '80%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>

							{/* Back button */}
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
							
							{/* Debuff name */}
							<Typography
								variant="h6"
								component="h6"
								sx={{
									marginBottom: '10px',
								}}
							>
								{powerUp.name}
							</Typography>
							
							{/* Debuff description */}
							<Typography
								sx={{
									fontSize: '13px',
									color: 'rgba(255, 255, 255, 0.5)',
									fontWeight: '20px',
									marginBottom: '20px',
								}}
							>
								{powerUp.fulldescription}
							</Typography>

							{/* Debuff cost */}
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

							{/* Choose Target Team title */}
							<Typography
								sx={{
									fontSize: '13px',
									color: 'rgba(255, 255, 255, 0.5)',
									fontWeight: '20px',
									marginBottom: '10px',
									marginTop: '10px',
								}}
							>
								Choose Target Team:
							</Typography>
							
							{/* Teams to be Targeted List */}
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
									gap: 2,
								}}
							>

								{/* Map enemy teams */}
								{
									teamToShow.map((enemy, index) => (	
										<Box
											onClick={enemy.debuff.length == 0 ? () => setSelectedEnemy(enemy) : null}
											key={index}
											sx={{
												width: '30%',
												bgcolor: selectedEnemy && selectedEnemy.name.localeCompare(enemy.name) === 0 ? 'rgba(10, 20, 30, 1)' : 'rgba(0, 0, 10, 1)',		// If team selected, change bgcolor
												borderRadius: '10px',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												paddingY: 2,
												gap: 1,
												cursor: enemy.debuff.length == 0 && 'pointer',
												'&:hover': enemy.debuff.length == 0 && {bgcolor: 'rgba(10, 20, 30, 1)',},
												position: 'relative',
											}}											
										>
											{/* Enemy Teams with ongoing debuff, Overlay Div */}
											{
												enemy.debuff.length != 0 && (
													<Box
														sx={{
															position: 'absolute',
															bgcolor: 'rgba(0, 0, 0, 0.7)',
															width: '100%',
															height: '100%',
															borderRadius: '10px',
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'center',
														}}
													>
														<Box
															sx={{
																width: '100%',
																paddingY: 1,
																bgcolor: 'rgba(255, 255, 255, 0.03)',
																backdropFilter: 'blur(10px)',
																WebkitBackdropFilter: 'blur(10px)',                
																boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',   
																textAlign: 'center',
															}}
														>
															<Typography
																sx={{
																	color: 'rgba(255, 255, 255, 0.5)',
																	fontSize: '14px',					
																}}
															>
																Debuff ongoing
															</Typography>	
														</Box>																										
													</Box>
												)
											}

											{/* Enemy Team logos, currently just the box with plain colors */}
											<Box
												sx={{
													width: '60px',
													height: '60px',
													borderRadius: '10px',
													bgcolor: 'rgba(100, 110, 130, 1)',
												}}
											>
												{/* TEAM LOGO Here */}
											</Box>
											
											{/* Enemy Team name */}
											<Typography
												sx={{
													fontSize: '15px',
													color:'rgba(255, 255, 255, 0.3)',
												}}
											>
												{enemy.name}
											</Typography>
										</Box>
										
									))
								}
							</Box>
							
							{/* Pagination Buttons */}
							<Box
								sx={{
									width: '100%',
									marginTop: '20px',
									marginBottom: '20px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Pagination 
									count={Math.ceil(teams.length / 3)} variant="outlined" 
									shape="rounded"
									size='small'
									sx={{
										'& .MuiPaginationItem-root': {
											color: 'white.main', // Text color
											backgroundColor: 'rgba(0, 0, 10, 1)',
											fontSize: '12px'
										},
										'& .MuiPaginationItem-page.Mui-selected': {
											backgroundColor: 'rgba(30, 40, 50, 1)', // Background color of the selected page
											color: 'white.main', // Text color of the selected page
										}
									}} 
									onChange={handlePageClick}
								/>

							</Box>
							
							{/* Buttons to Inflict the debuff */}
							{
								selectedEnemy != null ? (
									<Button
										onClick={() => applyDebuff(selectedEnemy.name, powerUp.name)}
										variant="contained"
										sx={{
											marginBottom: '20px',
											marginTop: '20px',
											height: '40px',
											fontSize: '14px',
										}}
									>
										Inflict debuff to {selectedEnemy.name}
									</Button>
								) : (
									<Button
										sx={{
											bgcolor: 'rgba(255, 255, 255, 0.1)',
											marginBottom: '20px',
											marginTop: '20px',
											height: '40px',
										}}
										disabled
									>
										<Typography
											sx={{
												color: 'rgba(255, 255, 255, 0.2)',
												fontSize: '14px',
											}}
										>
											Inflict debuff to Enemy
										</Typography>
									</Button>
								)
							}


						</Box>
					</Box>
				)
			}
		</>
	);
};

Debuff.propTypes = {
	showDebuffs: PropTypes.bool.isRequired,
	seeDetails: PropTypes.bool.isRequired,
	handleClickedPowerup: PropTypes.func.isRequired,
	handleBack: PropTypes.func.isRequired,
	powerUp: PropTypes.object,
};


export default Debuff;