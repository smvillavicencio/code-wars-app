/* eslint-disable */ 
import LockIcon from '@mui/icons-material/Lock';
import {
	Button,
	Box,
	Stack,
	Toolbar,
	Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import seal from 'assets/UPLB COSS.png';
import {
	CustomModal,
	ParticipantsLeaderboard,
	SponsorCarousel,
	Table,
	Timer,
	TopBar
} from 'components/';



// dummy data for problems table
const columns1 = [
	{
		field: 'id',
		headerName: '#',
		minWidth: 60,
		maxWidth: 100,
		headerAlign: 'center',
		align: 'center',
		flex: 1,
	},
	{
		field: 'problemTitle',
		headerName: 'Problem Title',
		minWidth: 400,
		// maxWidth: 500,
		flex: 1,
	},
	{
		field: 'status',
		headerName: 'Status',
		minWidth: 150,
		// maxWidth: 200,
		flex: 1,
	},
	{
		field: 'score',
		headerName: 'Score',
		minWidth: 100,
		maxWidth: 200,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
	{
		field: 'checkedBy',
		headerName: 'Checked By',
		minWidth: 200,
		// maxWidth: 250,
		flex: 1,
	},
];

// dummy data for problems table
const rows1 = [
	{ id: 1, problemTitle: 'Special Calculator', status: 'Unopened', score: 0/200, checkedBy: 'Sir Hermocilla'},
	{ id: 2, problemTitle: 'Listing All Addends', status: 'Submitted', score: 0/400, checkedBy: 'Sir Isungga'},
	{ id: 3, problemTitle: 'BINGO', status: 'Under Review', score: 0/400, checkedBy: 'Sir Doria'},
	{ id: 4, problemTitle: 'Hamming distance, interleavings, and isomorphic', status: 'Unopened', score: 500/500, checkedBy: 'Sir Hermocilla'},
	{ id: 5, problemTitle: 'The "Without" Problems', status: 'Done', score: 300/700, checkedBy: 'Sir Isungga' },
	{ id: 6, problemTitle: 'Figuring Patterns', status: 'Done', score: 0/1000, checkedBy: 'Sir Doria' },
	{ id: 7, problemTitle: 'Recursive Shifting', status: 'Submitted', score: 0/2800, checkedBy: 'Sir Hermocilla'},
	{ id: 8, problemTitle: 'Sudoku Validator', status: 'Unopened', score: 0/5500, checkedBy: 'Sir Isungga'},
	{ id: 9, problemTitle: 'Figure Output Pattern', status: 'Unopened', score: 0/600, checkedBy: 'Sir Doria' },
	{ id: 10, problemTitle: 'Roman Numeral Calculator', status: 'Unopened', score: 0/700, checkedBy: 'Sir Hermocilla'},
];

// dummy data for leaderboard
const columns2 = [
	{
		field: 'id',
		headerName: 'ID',
	},
	{
		field: 'rank',
		headerName: 'Rank',
		minWidth: 60,
		maxWidth: 100,
		headerAlign: 'center',
		align: 'center',
		flex: 1,
	},
	{
		field: 'teamName',
		headerName: 'Team Name',
		minWidth: 400,
		// maxWidth: 500,
		flex: 1,
	},
	{
		field: 'score',
		headerName: 'Score',
		minWidth: 150,
		// maxWidth: 200,
		flex: 1,
	},
	{
		field: 'totalSpent',
		headerName: 'Total Spent',
		minWidth: 100,
		maxWidth: 200,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
];

// dummy data for leaderboard
const rows2 = [
	{ id: 1, rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
	{ id: 2, rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
	{ id: 3, rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
	{ id: 4, rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
	{ id: 5, rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
	{ id: 6, rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
	{ id: 7, rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];


/*
 * Purpose: Displays the View All Problems Page for participants.
 * Params: None
 */
const ViewAllProblemsPage = () => {

	const additionalStyles = {
		backgroundColor: '#fff',
		'& .MuiDataGrid-columnHeader': {
			fontSize: "h2",
		},
	};

	// used for client-side routing to other pages
	const navigate = useNavigate();

	/**
   * Purpose: Handles opening of leaderboard modal window upon clicking the ellipsis button.
   * Params: <Object> receives information of selected problem in the Problem List Table.
   */
	const handleRowClick = () => {
		return 0;
		// navigate('/participant/view-specific-problem');
	};


	return (
		<Stack>
			{/* Topbar */}
			<TopBar
				isImg={true}
				icon={seal}
				title="Code Wars"
				subtitle="UPLB Computer Science Society"
				buttonText="BUY POWER-UP"
				// handleButton={}
			/>

			{/* Other components */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 4,
				}}
			>
				{/* Left column is for timer, leaderboard, sponsors' carousel */}
				<Stack
					spacing={3}
					sx={{
						mt: 4,
						mx: 8,
						minWidth: 325,
					}}
				>
					<Timer />
					<ParticipantsLeaderboard rows={rows2} columns={columns2} />
					<SponsorCarousel />
				</Stack>

				{/* Right column is for the round buttons and problem list table */}
				<Stack
					spacing={5}
					sx={{
						mt: 8,
						width: '68%',
					}}
				>
          
					{/* Container for round buttons */}
					<Box sx={{ display: 'flex', gap: 3 }}>

						{/* Easy round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              EASY
						</Button>

						{/* Medium round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              MEDIUM
						</Button>

						{/* Wager round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              WAGER
						</Button>

						{/* Hard round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              HARD
						</Button>
					</Box>

					{/* Problem List Table for the round */}
					<Table
						rows={rows1}
						columns={columns1}
						hideFields={[]}
						onRowClick={handleRowClick}
						additionalStyles={additionalStyles}
					/>
					<Toolbar />
				</Stack>
			</Box>
		</Stack>
	);
};

export default ViewAllProblemsPage;