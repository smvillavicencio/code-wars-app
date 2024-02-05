/* eslint-disable */ 
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
	Box,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


/*
 * Purpose: Displays the top 4 participants in the realtime leaderboard for participants.
 * Params: <Array> rows - receives the rows from the leaderboard table
 */
const ParticipantsLeaderboard = ({ rows }) => {

	// used for client-side routing to other pages
	const navigate = useNavigate();

	/*
   * Purpose: Handles opening of leaderboard modal window upon clicking the ellipsis button.
   * Params: <Object> receives information of selected problem in the Problem List Table.
   */
	const handleClick = () => {
		navigate('/participant/view-specific-problem');
	};
	

	return (
		<Box
			sx={{
				minWidth: 300,
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center',
				borderRadius: '15px',
				bgcolor: 'rgba(255, 255, 255, 0.1)',
				boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
				backdropFilter: 'blur(10px)',
			}}
		>
			<Stack
				sx={{
					paddingX: 4,
					paddingTop: 4,
					alignItems: 'center',
				}}
			>
				{/* Component Title */}
				<Typography variant="h5">Real-time</Typography>
				<Typography variant="h5">Leaderboard</Typography>

				{/* Rankings */}
				<Box sx={{ marginTop: 2, width: '100%' }}>

					{rows.map((row, idx) => (
						// check if row belongs to top 4
						idx < 4 ? 
							// if row is in top 4, display this
							<Typography
								sx={{
									gap: 5,
									padding: 2,
									marginY: 1,
									display: 'flex',
									borderRadius: '5px',
									background: 'rgba(255, 255, 255)',
								}}
							>
								<span>{row.rank}</span>
								<span>{row.teamName}</span>
							</Typography>
            
							// current row does not belong to top 4
							: <></>
					))}
				</Box>

				{/* Ellipsis menu */}
				<IconButton onClick={handleClick}>
					<MoreHorizIcon style={{ width: 40, height: 30, color: '#fff' }} />
				</IconButton>
			</Stack>
		</Box>
	);
};

export default ParticipantsLeaderboard;