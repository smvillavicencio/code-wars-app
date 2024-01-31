import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";


const ProblemListTable = ({ rows, columns }) => {
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
      autoPageSize
      disableColumnSelector
      disableColumnFilter
      hideFooterSelectedRowCount
      autoHeight
      onRowClick={handleRowClick}
    
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