import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

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
const rows = [
  { id: 1, rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
  { id: 2, rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
  { id: 3, rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
  { id: 4, rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
  { id: 5, rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
  { id: 6, rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
  { id: 7, rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];

const OverallLeaderboard = () => {

  const [currRows, setCurrRows] = useState([]);

  useEffect(() => { 
    setCurrRows(rows);
	}, [])
	
  const handleRowClick = (
    params,   // GridRowParams
    event,    // MuiEvent<React.MouseEvent<HTMLElement>>
    details,  // GridCallbackDetails
  ) => {
    console.log(params);
  };
  
	return (
    <DataGrid
      rows={currRows}
      columns={columns}
      pageSizeOptions={[5, 10]}
      disableColumnSelector
      disableColumnFilter
      hideFooterSelectedRowCount
      onRowClick={handleRowClick}
      autoPageSize={false}
    
      sx={{
        // modify column header typography
        '& .MuiDataGrid-columnHeader': {
          fontSize: "h2",
          bgcolor: "rgba(0, 0, 0, 0.1)",
        },
        // modify cell typography
        '& .MuiDataGrid-cell': {
          variant: "body1",
          borderLeft: 'none',
          borderRight: 'none', 
          borderTop: 'none', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.07)'
        },
        // make column header separator invisible
        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        // remove cell focus on selection
        '.MuiDataGrid-cell:focus': {
          outline: 'none'
        },
        // pointer cursor on ll rows
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
        '.MuiDataGrid-footerContainer': {
          borderTop: 'none', // Change the color and width of the line
        },

        // truncate values if longer than column maxWidth
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        //
        bgcolor: 'transparent',
        border: 'none',
        p:2,
      }}
    />
  )
}

export default OverallLeaderboard;