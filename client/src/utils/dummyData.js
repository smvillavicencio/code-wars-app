// options for rounds dropdown select
export const optionsRounds = [
	'Easy',
	'Medium',
	'Wager',
	'Hard',
];

// dummy data for leaderboard
export const columnsLeaderboard = [
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
		minWidth: 250,
		maxWidth: 600,
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
		maxWidth: 150,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
];

export const rowsLeaderboard = [
	{ id: 1, rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
	{ id: 2, rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
	{ id: 3, rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
	{ id: 4, rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
	{ id: 5, rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
	{ id: 6, rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
	{ id: 7, rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];