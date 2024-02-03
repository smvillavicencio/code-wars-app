import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";


/*
 * Purpose: Displays the table for View All Problems Page for participants.
 * Params:
 *    <Array> rows - receives rows to be displayed on the table.
 *    <Array> columns - receives columns to be displayed on the table.
 */
const ProblemListTable = ({ rows, columns }) => {
  // state for the rows displayed
	const [currRows, setCurrRows] = useState([]);

  // sets up the rows on component mount
	useEffect(() => { 
    setCurrRows(rows);
	}, [])
	
	/*
   * Purpose: Handles routing to View Specific Problem Page upon clicking a row.
   * Params: <Object> data - receives information of selected problem in the Problem List Table.
   */
  const handleRowClick = (data) => {
    console.log(data);
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
        },
        // modify cell typography
        '& .MuiDataGrid-cell': {
          variant: "body1",
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
          cursor: 'pointer'
        },
        backgroundColor: "#fff",

        // truncate values if longer than column maxWidth
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    />
  )
};

export default ProblemListTable;