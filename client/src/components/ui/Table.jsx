/* eslint-disable */ 
import { useEffect } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";


/**
 * Purpose: Displays the current overall leaderboard.
 * Params:
 *    <Array> rows - receives the rows for the leaderboard table
 *    <Array> columns - receives the columns for the leaderboard table
 *    <String> hideFields - receives the name of field/s to hide
 *    <Object> additionalStyles - contains additional styling for a particular component instance
 *    ...props - receives the rest of the props
 */
const Table = ({
  rows,
  columns,
  hideFields,
  additionalStyles,
  ...props
}) => {
  /**
   * Create the apiRef to hide selected columns dynamically
   */
  const apiRef = useGridApiRef();

  useEffect(() => {
    hideFields.forEach((field) => {
      /**
       * Update the column visibility using apiRef
       */
      apiRef.current.setColumnVisibility(field, false)
    })
  }, []);

  /**
   * Define common styles for the DataGrid
   */
  const commonStyles = {
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
      // Change the color and width of the line
      borderTop: 'none',
    },

    // truncate values if longer than column maxWidth
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  /**
   * Combine commonStyles with additionalStyles if provided
   */
  const gridStyles = { ...commonStyles, ...additionalStyles };


	return (
    <DataGrid
      apiRef={apiRef}               // Pass the apiRef to the DataGrid
      rows={rows}
      columns={columns}
      // loading={!rows.length}     // Display loading indicator if rows has not yet loaded
      pageSizeOptions={[5, 10]}
      disableColumnSelector
      disableColumnFilter
      
      sx={gridStyles}
      {...props}
    />
  )
}

export default Table;