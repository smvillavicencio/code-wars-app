import {
	Button,
	Box,
	Tooltip,
	Typography
} from "@mui/material";

import ProblemListTable from "../components/data-table/ProblemListTable";


// dummy data
const columns = [
	{
		field: "id",
		headerName: "#",
    minWidth: 60,
    maxWidth: 100,
    headerAlign: "center",
    align: "center",
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
		field: "status",
		headerName: "Status",
		minWidth: 150,
    // maxWidth: 200,
		flex: 1,
	},
	{
		field: "score",
		headerName: "Score",
    minWidth: 100,
    maxWidth: 200,
    headerAlign: "left",
    align: "left",
		flex: 1,
	},
	{
		field: "checkedBy",
		headerName: "Checked By",
    minWidth: 200,
    // maxWidth: 250,
    flex: 1,
	},
];

// dummy data
const rows = [
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


const ViewAllProblemsPage = () => {
	return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "column",
        ml: "500px",
        width: "68%",
      }}>
      <Typography
        noWrap
        variant="h3"
        component="div"
      >
        <Button
          variant="contained"
          // startIcon={<Add />}
          sx={{
            borderRadius: "10px",
          }}
        >
          EASY
        </Button>
      </Typography>

      <ProblemListTable rows={rows} columns={columns} />
    </Box>
  )
};

export default ViewAllProblemsPage;