/* eslint-disable */ 
import {
	Box,
	Stack,
	Typography
} from '@mui/material';

import {
	LogTable,
	Sidebar
} from 'components/';


// dummy data
const columns = [
	{
		field: 'id',
		headerName: 'ID',
		width: 50,
		flex: 1,
	},
	{
		field: 'teamName',
		headerName: 'Team Name',
		minWidth: 300,
		flex: 1,
	},
	{
		field: 'type',
		headerName: 'Type',
		minWidth: 75,
		flex: 1,
	},
	{
		field: 'powerup',
		headerName: 'Power-Up',
		minWidth: 150,
		// maxWidth: 200,
		flex: 1,
	},
	{
		field: 'timestamp',
		headerName: 'Timestamp',
		minWidth: 100,
		maxWidth: 200,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
	{
		field: 'recipient',
		headerName: 'Recipient',
		minWidth: 200,
		// maxWidth: 250,
		flex: 1,
	}
];

// dummy data
const rows = [
	{ id: 0,teamName: 'Team Yeah Yeah', type: 'Buff', powerup:'Dispel', timestamp: '09:55:01', recipient: 'Team One'},
	{ id: 1,teamName: 'Team Wiwzzz', type: 'Buff', powerup:'Immunity', timestamp: '09:48:55', recipient: 'Team Two'},
	{ id: 2,teamName: 'Team Ooohh', type: 'Debuff', powerup:'Stun', timestamp: '09:45:08', recipient: 'Team One'},
	{ id: 3,teamName: 'Team One', type: 'Buff', powerup:'Dispel', timestamp: '09:37:44', recipient: 'Team Three'},
	{ id: 4,teamName: 'Team Two', type: 'Debuff', powerup:'Stun', timestamp: '09:33:04', recipient: 'Team Seven'},
	{ id: 5,teamName: 'Team Three', type: 'Debuff', powerup:'Stun', timestamp: '09:30:15', recipient: 'Team Five'},
	{ id: 6,teamName: 'Team Four', type: 'Debuff', powerup:'Editor', timestamp: '09:10:45', recipient: 'Team Ten'},
	{ id: 7,teamName: 'Team Five', type: 'Buff', powerup:'Dispel', timestamp: '09:10:45', recipient: 'Team Ten'},
	{ id: 8,teamName: 'Team Six', type: 'Buff', powerup:'Stun', timestamp: '09:00:27', recipient: 'Team Nine'},
	{ id: 9,teamName: 'Team Seven', type: 'Debuff', powerup:'Editor', timestamp: '09:00:15', recipient: 'Team Four'},
];


/*
 * Purpose: Displays the page power-up logs for admin.
 * Params: None
 */
const PowerUpLogs = () => {
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
						<LogTable rows={rows} columns={columns} />
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default PowerUpLogs;