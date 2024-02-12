/* eslint-disable */ 
import { useEffect } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';


/**
 * Purpose: Displays data in table form using MUI DataGrid component.
 * Params:
 *    <Array>     rows - array of objects containing the table's rows
 *    <Array>     columns - array of objects containing the table's columns
 *    <Array>     hideFields - array containing column names to be hidden
 *    <Object>    additionalStyles - object containing additional styling for table
 *    <Function>  handleRowClick - function that will handle navigation
 */
const Table = ({
  rows,
  columns,
  hideFields,
  additionalStyles,
  handleRowClick
}) => {
  /**
   * Create the apiRef to hide selected columns dynamically
   */
  const apiRef = useGridApiRef();

  /**
   * Used for client-side routing to other pages
   */
	const navigate = useNavigate();

  /**
   * Hide columns on component mount
   */
  useEffect(() => {
    hideFields.forEach((field) => {
      /**
       * Update the column visibility using apiRef
       */
      apiRef.current.setColumnVisibility(field, false)
    })
  }, []);

  /**
   * Purpose: Define common styles for the DataGrid
   */
  const commonStyles = {
    // modify cell typography
    '.MuiDataGrid-cell': {
      // variant: "body1 !important",
      fontFamily: 'Inter',
      fontSize: '1rem',
      fontWeight: '400',
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
    // make cursor a pointer on all rows
    '.MuiDataGrid-row:hover': {
      cursor: 'pointer',
    },
    // Change the color and width of the line
    '.MuiDataGrid-footerContainer': {
      borderTop: 'none',
    },
    // Modify column header font styling
    '.MuiDataGrid-columnHeaderTitle': { 
      fontWeight: '700',
      fontFamily: 'Poppins',
      color: '#707070',
      fontSize: '1rem'
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
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      // loading={!rows.length}     // Display loading indicator if rows has not yet loaded
      pageSizeOptions={[5, 10]}
      disableColumnSelector
      disableColumnFilter
      onRowClick={handleRowClick}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}

      sx={gridStyles}
    />
  )
}

export default Table;