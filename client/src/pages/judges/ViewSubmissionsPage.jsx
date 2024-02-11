/* eslint-disable */ 
import { useState } from 'react';

import ViewListIcon from '@mui/icons-material/ViewList';
import {
	Box,
	Stack
} from '@mui/material';

import seal from 'assets/UPLB COSS.png';
import {
	CustomModal,
	DropdownSelect,
	Table,
	TopBar
} from 'components/';


// dummy data
const columns = [
	{
		field: 'id',
		headerName: 'ID',
		width: 50,
	},
	{
		field: 'teamName',
		headerName: 'Team Name',
		minWidth: 300,
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
		field: 'submittedAt',
		headerName: 'Submitted At',
		minWidth: 150,
		// maxWidth: 200,
		flex: 1,
	},
	{
		field: 'file',
		headerName: 'Uploaded File',
		minWidth: 100,
		maxWidth: 200,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
	{
		field: 'evaluation',
		headerName: 'Evaluation',
		minWidth: 200,
		// maxWidth: 250,
		flex: 1,
	},
	{
		field: 'checkedBy',
		headerName: 'Judge',
		minWidth: 200,
		// maxWidth: 250,
		flex: 1,
	},
];

// dummy data
const rows = [
	{ id: 0,teamName: 'Team Yeah Yeah', problemTitle: 'Special Calculator', submittedAt: '09:55:01', file: 0/200, results: '', checkedBy: 'Sir Hermocilla'},
	{ id: 1,teamName: 'Team Wiwzzz', problemTitle: 'Listing All Addends', submittedAt: '09:48:55', file: 0/400, results: '', checkedBy: 'Sir Isungga'},
	{ id: 2,teamName: 'Team Ooohh', problemTitle: 'BINGO', submittedAt: '09:45:08', file: 0/400, results: '', checkedBy: 'Sir Doria'},
	{ id: 3,teamName: 'Team One', problemTitle: 'Hamming distance, interleavings, and isomorphic', submittedAt: '09:37:44', file: 500/500, results: '', checkedBy: 'Sir Hermocilla'},
	{ id: 4,teamName: 'Team Two', problemTitle: 'The "Without" Problems', submittedAt: '09:33:04', file: 300/700, results: '', checkedBy: 'Sir Isungga' },
	{ id: 5,teamName: 'Team Three', problemTitle: 'Figuring Patterns', submittedAt: '09:30:15', file: 0/1000, results: '', checkedBy: 'Sir Doria' },
	{ id: 6,teamName: 'Team Four', problemTitle: 'Recursive Shifting', submittedAt: '09:10:45', file: 0/2800, results: '', checkedBy: 'Sir Hermocilla'},
	{ id: 7,teamName: 'Team Five', problemTitle: 'Sudoku Validator', submittedAt: '09:10:45', file: 0/5500, results: '', checkedBy: 'Sir Isungga'},
	{ id: 8,teamName: 'Team Six', problemTitle: 'Figure Output Pattern', submittedAt: '09:00:27', file: 0/600, results: '', checkedBy: 'Sir Doria' },
	{ id: 9,teamName: 'Team Seven', problemTitle: 'Roman Numeral Calculator', submittedAt: '09:00:15', file: 0/700, results: '', checkedBy: 'Sir Hermocilla'},
];

// dummy data
const optionsTeam = [
	'Team Yeah Yeah',
	'Team Wiwzzz',
	'Team Ooohh',
	'Team One',
	'Team Two',
	'Team Three',
	'Team Four',
	'Team Five',
	'Team Six',
	'Team Seven',
];

// dummy data
const optionsProblem = [
	'Special Calculator',
	'Listing All Addends',
	'BINGO',
	'Hamming distance, interleavings, and isomorphic',
	'The "Without" Problems',
	'Figuring Patterns',
	'Recursive Shifting',
	'Sudoku Validator',
	'Figure Output Pattern',
	'Roman Numeral Calculator',
];

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
 * Purpose: Displays the View Submissions Page for judges.
 * Params: None
 */
const ViewSubmissionsPage = () => {
	// state handler for overall leaderboard modal
	const [open, setOpen] = useState(false);

	/**
	* Purpose: Handles opening of modal window for overall leaderboard.
	* Params: None
	*/
	const handleButton = () => {
		setOpen(true);
	}

	const additionalStylesLeaderboard = {
		// modify column header typography
		'& .MuiDataGrid-columnHeader': {
			bgcolor: "rgba(0, 0, 0, 0.1)",
		},
		bgcolor: 'transparent',
		border: 'none',
		padding: 2,
	}

	const additionalStylesSubmissions = {
		backgroundColor: '#fff',
		paddingX: 2,
	}

	return (
		<Box>
			<TopBar
				isImg={true}
				icon={seal}
				title="Code Wars"
				subtitle="UPLB Computer Science Society"
				buttonText="VIEW LEADERBOARD"
				startIcon={<ViewListIcon />}
				handleButton={handleButton}
			/>
			
			<Stack spacing={5} sx={{ mt: 5, mx: 15 }}>
				
				{/* Dropdown selects for team name and problem title */}
				<Box sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 5,
				}}>
					<DropdownSelect
						isDisabled={false}
						label="Team Name"
						minWidth="20%"
						options={optionsTeam}
					/>
					<DropdownSelect
						isDisabled={false}
						minWidth="35%"
						label="Problem Title"
						options={optionsProblem}
					/>
				</Box>

				{/* Submission Entry Table */}
				<Table
					rows={rows}
					columns={columns}
					hideFields={[]}
					additionalStyles={additionalStylesSubmissions}
					// hideFooter
					// autoPageSize
				/>
			</Stack>

			{/* Overall Leaderboard Modal Window */}
			<CustomModal isOpen={open} setOpen={setOpen} windowTitle="Leaderboard">
				<Table
					rows={rowsLeaderboard}
					columns={columnsLeaderboard}
					hideFields={['id', 'totalSpent']}
					additionalStyles={additionalStylesLeaderboard}
					hideFooter
					autoPageSize
				/>
			</CustomModal>
		</Box>
	);
};

export default ViewSubmissionsPage;