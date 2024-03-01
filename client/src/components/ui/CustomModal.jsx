/* eslint-disable */ 
import CloseIcon from '@mui/icons-material/Close';
import {
	Backdrop,
	Box,
	Button,
	Fade,
	Modal,
	Typography
} from '@mui/material';


/*
 * Purpose: Displays an empty modal window.
 * Params:
 *    <Boolean> isOpen - tells whether the modal should be displayed or not.
 *    <Func>    setOpen - controls the opening and closing of the modal window.
 *    <String>  windowTitle - title of the modal window to display.
 *    <Props>   ...props - will receive the rest of the properties passed.
 */
const CustomModal = ({
	isOpen,
	setOpen,
	windowTitle,
	...props
}) => {

	/*
   * Purpose: Closes the modal window.
   * Params: None
   */ 
	const handleClose = () => setOpen(false);

	
	return (
		<Modal
			open={isOpen}
			//onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>   
			{/* Fade in effect */}
			<Fade in={isOpen}>

				{/* Modal Window */}
				<Box
					sx={{
						// centering the window
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',

						// blur all contents in the background
						backdropFilter: 'blur(20px)',
						WebkitBackdropFilter: 'blur(10px)',
						boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',

						padding: 4,
						minWidth: '25%',
						maxWidth: '75%', // para sa if empty leaderboard
						borderRadius: '10px',
						bgcolor: 'rgba(255, 255, 255)',
					}}
				>

					{/* Container for window title and close button */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								fontFamily: 'Inter',
								color: 'general.main'
							}}
						>
							{windowTitle}
						</Typography>
						{
							windowTitle != "Test Case Evaluation" ?
							<CloseIcon
							sx={{
								width: '30px',
								height: '30px',
								color: 'general.main',
								'&:hover': {
									cursor: 'pointer',
									color: 'glass.main' 
								}
							}}
							onClick={handleClose}
							/> : null
						}
					</Box>
					
					{/* Modal Body */}
					{props.children}
				</Box>
			</Fade>
		</Modal>
	);
};

export default CustomModal;