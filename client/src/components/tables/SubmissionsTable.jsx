/* eslint-disable */ 
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


/*
 * Purpose: Displays the table for View Submissions Page for judges.
 * Params:
 *    <Array> rows - receives rows to be displayed on the table.
 *    <Array> columns - receives columns to be displayed on the table.
 */
const SubmissionsTable = ({ rows, columns }) => {
	// state for the rows displayed
	const [currRows, setCurrRows] = useState([]);

	// sets up the rows on component mount
	useEffect(() => { 
		setCurrRows(rows);
	}, []);
	

	return (
		<DataGrid
			rows={currRows}
			columns={columns}
			pageSizeOptions={[5, 10]}
			disableColumnSelector
			disableColumnFilter
			hideFooterSelectedRowCount
			autoPageSize={false}

			initialState={{
				columns: {
					columnVisibilityModel: {
						// Hide id column
						id: false,
					},
				},
			}}

			sx={{
				// modify column header typography
				'& .MuiDataGrid-columnHeader': {
					fontSize: 'h2',
				},
				// modify cell typography
				'& .MuiDataGrid-cell': {
					variant: 'body1',
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
				backgroundColor: '#fff',

				// truncate values if longer than column maxWidth
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		/>
	);
};

export default SubmissionsTable;