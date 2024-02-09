/* eslint-disable */ 
import { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
	Box,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';

import {
	CustomModal,
	Table
} from 'components';


// dummy data
const columnsLeaderboard = [
	{
		field: "rank",
		headerName: "Rank",
    minWidth: 60,
    maxWidth: 100,
    headerAlign: "center",
    align: "center",
		flex: 1,
	},
	{
		field: "teamName",
		headerName: "Team Name",
    minWidth: 250,
    maxWidth: 600,
		flex: 1,
	},
	{
		field: "score",
		headerName: "Score",
		minWidth: 150,
    // maxWidth: 200,
		flex: 1,
	},
	{
		field: "totalSpent",
		headerName: "Total Spent",
    minWidth: 100,
    maxWidth: 150,
    headerAlign: "left",
    align: "left",
		flex: 1,
	},
];

// dummy data
const rowsLeaderboard = [
  { id: 1, rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
  { id: 2, rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
  { id: 3, rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
  { id: 4, rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
  { id: 5, rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
  { id: 6, rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
  { id: 7, rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];


/**
 * Purpose: Displays the top 4 participants in the realtime leaderboard for participants.
 * Params: <Array> rows - receives the rows from the leaderboard table
 */
const ParticipantsLeaderboard = ({ rows }) => {

	// state handler for overall leaderboard modal
	const [open, setOpen] = useState(false);

	/**
	* Purpose: Handles opening of modal window for overall leaderboard.
	* Params: None
	*/
	const handleButton = () => {
		setOpen(true);
	}

	const additionalStyles = {
		// modify column header typography
		'& .MuiDataGrid-columnHeader': {
			fontSize: "h2",
			bgcolor: "rgba(0, 0, 0, 0.1)",
		},
		bgcolor: 'transparent',
		border: 'none',
		padding: 2,
	}

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
								key={idx}
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
				<IconButton onClick={handleButton}>
					<MoreHorizIcon style={{ width: 40, height: 30, color: '#fff' }} />
				</IconButton>
			</Stack>

			{/* Overall Leaderboard Modal Window */}
			<CustomModal isOpen={open} setOpen={setOpen} windowTitle="Leaderboard">
				<Table
					rows={rowsLeaderboard}
					columns={columnsLeaderboard}
					hideFields={['id', 'totalSpent']}
					additionalStyles={additionalStyles}
					hideFooter
					autoPageSize
				/>
			</CustomModal>
		</Box>
	);
};

export default ParticipantsLeaderboard;