import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const columns = [
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
    minWidth: 400,
    // maxWidth: 500,
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
    maxWidth: 200,
    headerAlign: "left",
    align: "left",
		flex: 1,
	},
];

// dummy data
const rows = [
  { rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
  { rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
  { rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
  { rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
  { rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
  { rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
  { rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];

const OverallLeaderboard = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Team Name</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Total Spent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.rank}</TableCell>
              <TableCell align="right">{row.teamName}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.totalSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OverallLeaderboard;