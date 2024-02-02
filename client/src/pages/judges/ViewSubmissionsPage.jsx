import {
	DropdownSelect,
	SubmissionsTable,
	TopBar
} from '../../components/index.js';
import seal from "../../assets/UPLB COSS.png";
import ViewListIcon from '@mui/icons-material/ViewList';

import {
	Box,
	Stack
} from '@mui/material';


// dummy data
const columns = [
	{
		field: "id",
		headerName: 'ID',
		width: 50,
	},
	{
		field: "teamName",
		headerName: "Team Name",
    minWidth: 300,
		flex: 1,
	},
	{
		field: "problemTitle",
		headerName: "Problem Title",
    minWidth: 400,
    // maxWidth: 500,
		flex: 1,
	},
	{
		field: "submittedAt",
		headerName: "Submitted At",
		minWidth: 150,
    // maxWidth: 200,
		flex: 1,
	},
	{
		field: "latestFile",
		headerName: "Latest Uploaded File",
    minWidth: 100,
    maxWidth: 200,
    headerAlign: "left",
    align: "left",
		flex: 1,
	},
	{
		field: "results",
		headerName: "Results",
    minWidth: 200,
    // maxWidth: 250,
    flex: 1,
  },
  {
		field: "checkedBy",
		headerName: "Judge",
    minWidth: 200,
    // maxWidth: 250,
    flex: 1,
	},
];

// dummy data
const rows = [
  { id: 0,teamName: 'Team Yeah Yeah', problemTitle: 'Special Calculator', submittedAt: '09:55:01', latestFile: 0/200, results: '', checkedBy: 'Sir Hermocilla'},
  { id: 1,teamName: 'Team Wiwzzz', problemTitle: 'Listing All Addends', submittedAt: '09:48:55', latestFile: 0/400, results: '', checkedBy: 'Sir Isungga'},
  { id: 2,teamName: 'Team Ooohh', problemTitle: 'BINGO', submittedAt: '09:45:08', latestFile: 0/400, results: '', checkedBy: 'Sir Doria'},
  { id: 3,teamName: 'Team One', problemTitle: 'Hamming distance, interleavings, and isomorphic', submittedAt: '09:37:44', latestFile: 500/500, results: '', checkedBy: 'Sir Hermocilla'},
  { id: 4,teamName: 'Team Two', problemTitle: 'The "Without" Problems', submittedAt: '09:33:04', latestFile: 300/700, results: '', checkedBy: 'Sir Isungga' },
  { id: 5,teamName: 'Team Three', problemTitle: 'Figuring Patterns', submittedAt: '09:30:15', latestFile: 0/1000, results: '', checkedBy: 'Sir Doria' },
  { id: 6,teamName: 'Team Four', problemTitle: 'Recursive Shifting', submittedAt: '09:10:45', latestFile: 0/2800, results: '', checkedBy: 'Sir Hermocilla'},
  { id: 7,teamName: 'Team Five', problemTitle: 'Sudoku Validator', submittedAt: '09:10:45', latestFile: 0/5500, results: '', checkedBy: 'Sir Isungga'},
	{ id: 8,teamName: 'Team Six', problemTitle: 'Figure Output Pattern', submittedAt: '09:00:27', latestFile: 0/600, results: '', checkedBy: 'Sir Doria' },
	{ id: 9,teamName: 'Team Seven', problemTitle: 'Roman Numeral Calculator', submittedAt: '09:00:15', latestFile: 0/700, results: '', checkedBy: 'Sir Hermocilla'},
];

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

const ViewSubmissionsPage = () => {
	

  return (
		<Box>
			<TopBar
        isImg={true}
        icon={seal}
        title="Code Wars"
        subtitle="UPLB Computer Science Society"
				buttonText="VIEW LEADERBOARD"
				startIcon={<ViewListIcon />}
        // handleButton={}
			/>
			
			<Stack spacing={5} sx={{ mt: 5, mx: 15 }}>
				
				{/* dropdown selects */}
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

				{/* table */}
				<SubmissionsTable columns={columns} rows={rows} />
			</Stack>
				
		</Box>
  )
};

export default ViewSubmissionsPage;