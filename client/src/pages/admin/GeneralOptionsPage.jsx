/* eslint-disable */ 
import {
	Box,
	Button,
	Stack,
	Switch,
	Typography
} from '@mui/material';

import {
	DropdownSelect,
	Sidebar,
	Table
} from 'components/';


// options for dropdown select
const optionsRounds = [
	'Easy',
	'Medium',
	'Wager',
	'Hard',
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


/*
 * Purpose: Displays general options page for admin.
 * Params: None
 */
const GeneralOptionsPage = () => {
	const additionalStyles = {
		backgroundColor: '#fff',
		'& .MuiDataGrid-columnHeader': {
			fontSize: "h2",
		},
	};


	return (
		<Box sx={{ display: 'flex' }}>
			{/* Sidebar */}
			<Sidebar />

			{/* Other components */}
			<Stack spacing={7} sx={{ margin:'4em', width:'100%' }}>

				{/* General Options */}
				<Box>
					<Typography variant="h4">GENERAL</Typography>  
					<Typography
						variant="h6"
						sx={{
							display: 'flex',
							flexDirection: 'row',
							marginLeft: '4em',
							marginTop: '2em',
						}}
					>
						{/* Labels */}
						<Stack spacing={4} sx={{ marginRight: '2em' }}>
							<span>Freeze all screens</span>
							<span>Logout all sessions</span>
							<span>Move Round</span>
						</Stack>

						{/* Buttons */}
						<Stack spacing={3} sx={{ width: '15%' }}>

							{/* Toggle Switch */}
							<Switch />

							{/* Apply Button */}
							<Button
								variant="contained"
								color="major"
								sx={{
									'&:hover': {
										bgcolor: 'major.light',
										color: 'general.main',
									}
								}}
							>
                Apply
							</Button>

							{/* Dropdown Select */}
							<DropdownSelect
								isDisabled={false}
								label="Select Round"
								minWidth="100px"
								options={optionsRounds}
							/>
						</Stack>
					</Typography>
				</Box>

				{/* Leaderboard Table */}
					
				<Box>
					<Typography variant="h4">LEADERBOARD</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Box sx={{ width: '65%'}}>
							<Table
								rows={rowsLeaderboard}
								columns={columnsLeaderboard}
								hideFields={["id"]}
								additionalStyles={additionalStyles}
							/>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default GeneralOptionsPage;