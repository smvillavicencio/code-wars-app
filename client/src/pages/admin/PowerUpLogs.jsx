/* eslint-disable */ 
import { Box, Stack, Typography } from '@mui/material';
import { Sidebar, Table } from 'components/';
import { columnsPowerUpLog, rowsPowerUpLog } from 'utils/dummyData';


/*
 * Purpose: Displays the page power-up logs for admin.
 * Params: None
 */
const PowerUpLogs = () => {

	const additionalStyles = {
		backgroundColor: '#fff',
	};

	return (
		<Box sx={{ display: 'flex' }}>
			{/* Sidebar */}
			<Sidebar />

			{/* Other components */}
			<Stack spacing={7} sx={{ margin:'4em', width:'100%', height: 'auto'}}>

				{/* Page title */}
				<Box>
					<Typography variant="h4">POWER-UP LOGS</Typography>  
				</Box>

				{/* Table */}
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box sx={{ width: '80%' }}>
						<Table
							rows={rowsPowerUpLog}
							columns={columnsPowerUpLog}
							hideFields={[]}
							additionalStyles={additionalStyles}
							pageSizeOptions={[5, 10]}
							pageSize={10}
							autoHeight
							initialState={{
								pagination: { paginationModel: { pageSize: 10 } },
							}}
							// if there are no submission entries yet
							slots={{
								noRowsOverlay: () => (
									<Stack height="100%" alignItems="center" justifyContent="center">
										<Typography><em>No records to display.</em></Typography>
									</Stack>
								)
							}}
						/>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default PowerUpLogs;