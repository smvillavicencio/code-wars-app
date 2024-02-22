/* eslint-disable */ 
import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Sidebar, Table } from 'components/';
import { columnsPowerUpLog, rowsPowerUpLog } from 'utils/dummyData';
import Loading from 'components/widgets/screen-overlays/Loading';
import { useNavigate } from 'react-router-dom';

/*
 * Purpose: Displays the page power-up logs for admin.
 * Params: None
 */
const PowerUpLogs = ({
	isLoggedIn,
	setIsLoggedIn,
	checkIfLoggedIn
}) => {
	// used for client-side routing to other pages
	const navigate = useNavigate();

	const additionalStyles = {
		backgroundColor: '#fff',
	};

	useEffect(() => { 
		let usertype = JSON.parse(localStorage?.getItem("user"))?.usertype;
		if (usertype == "judge") {
			navigate('/judge/submissions');
		}
		else if (usertype == "participant") {
			navigate('/participant/view-all-problems');
		}
		else if (usertype == "admin") {
			checkIfLoggedIn();	
		}
		else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<>
		{ isLoggedIn ?
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
		</Box> : <Loading />
		}
		</>
	);
};

export default PowerUpLogs;