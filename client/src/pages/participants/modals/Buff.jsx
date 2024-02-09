import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WestIcon from '@mui/icons-material/West';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

//---------------------------------------------
// DUMMY DATA Start
const buffs = [
	{
		name: 'Dispel',
		shortDescription:  'dispelled debuff',
		fulldescription: 'The team’s current debuff is dispelled. When more than one debuff types are active, the team can only choose one.',
		Cost: '120% of the cost of the dispelled debuff',
		duration: ''
	},
	{
		name: 'Immunity I',
		shortDescription:  'Cannot be targeted by any debuff.',
		fulldescription: 'Is decided before the round starts. The team cannot be targeted by any debuff from opposing teams for five (5) minutes since the round starts.',
		Cost: '100 points',
		duration: '5 minutes'
	},
	{
		name: 'Immunity II',
		shortDescription:  'Cannot be targeted by any debuff.',
		fulldescription: 'Is decided before the round starts. The team cannot be targeted by any debuff from opposing teams for five (5) minutes since the round starts.',
		Cost: '100 points',
		duration: '5 minutes'
	},
	{
		name: 'Immunity III',
		shortDescription:  'Cannot be targeted by any debuff.',
		fulldescription: 'Is decided before the round starts. The team cannot be targeted by any debuff from opposing teams for five (5) minutes since the round starts.',
		Cost: '100 points',
		duration: '5 minutes'
	},
	{
		name: 'Immunity IV',
		shortDescription:  'Cannot be targeted by any debuff.',
		fulldescription: 'Is decided before the round starts. The team cannot be targeted by any debuff from opposing teams for five (5) minutes since the round starts.',
		Cost: '100 points',
		duration: '5 minutes'
	},
	{
		name: 'Unchain',
		shortDescription:  'Cannot be targeted by any debuff.',
		fulldescription: 'Is decided before the round starts. The team cannot be targeted by any debuff from opposing teams for five (5) minutes since the round starts.',
		Cost: '100 points',
		duration: '5 minutes'
	},
];
// DUMMY DATA End
//---------------------------------------------

const Buff = ({showBuffs, seeDetails, handleClickedPowerup, handleBack, powerUp}) => {

	return(
		<>
			{/* The List of Buffs */}
			{
				showBuffs && !seeDetails && (
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
						{/* Map the buffs - Main Div of buffs, clickable */}
						{
							buffs.map((item, index) => (
								
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
										{/* Div that contains the buff name, icon, and arrow icon */}
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
											}}
										>

											{/* Disple Icon */}
											{
												item.name.localeCompare('Dispel') === 0 && (
													<AutoAwesomeIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#85eeff',
														}}
													/>
												)
											}
											
											{/* Immunity I Icon */}
											{
												item.name.localeCompare('Immunity I') === 0 && (
													<LooksOneIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#ff9cee',
														}}
													/>
												)
											}

											{/* Immunity II Icon */}
											{
												item.name.localeCompare('Immunity II') === 0 && (
													<LooksTwoIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#b28dff',
														}}
													/>
												)
											}

											{/* Immunity III Icon */}
											{
												item.name.localeCompare('Immunity III') === 0 && (
													<Looks3Icon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#e7ffac',
														}}
													/>
												)
											}

											{/* Immunity IV Icon */}
											{
												item.name.localeCompare('Immunity IV') === 0 && (
													<Looks4Icon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#97a2ff',
														}}
													/>
												)
											}

											{/* Unchain Icon */}
											{
												item.name.localeCompare('Unchain') === 0 && (
													<NoEncryptionIcon
														sx={{
															marginLeft: '20px',
															marginRight: '10px',
															color: '#bffcc6',
														}}
													/>
												)
											}

											{/* Buff name */}
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


			{/* Specific Buff selected to view, Main Div */}
			{
				showBuffs && seeDetails && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
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
								onClick={handleBack}
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
							

							{/* Buff name */}
							<Typography
								variant="h6"
								component="h6"
								sx={{
									marginBottom: '10px',
								}}
							>
								{powerUp.name}
							</Typography>
							
							{/* Buff description */}
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
							
							{/* Buff cost */}
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
							
							{/* Buy button */}
							<Button
								variant="contained"
								sx={{
									marginBottom: '20px',
								}}
							>
								<ShoppingCartIcon
									sx={{
										margin: '5px',
									}}
								/>
                                BUY
							</Button>

						</Box>
					</Box>
				)
			}


			{
            
			}
		</>
	);
};

Buff.propTypes = {
	showBuffs: PropTypes.bool.isRequired,
	seeDetails: PropTypes.bool.isRequired,
	handleClickedPowerup: PropTypes.func.isRequired,
	handleBack: PropTypes.func.isRequired,
	powerUp: PropTypes.object,
};

export default Buff;