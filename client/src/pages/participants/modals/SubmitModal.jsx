// https://mui.com/material-ui/react-modal/ - Modal code in MUI React

import { Box, Button, Typography, Backdrop, Modal, Fade } from "@mui/material";
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SourceIcon from '@mui/icons-material/Source';
import PendingActionsIcon from '@mui/icons-material/PendingActions';



const  SubmitModal = () => {
    
	// ------------------------------------------------------
	// OPENING AND CLOSING SUBMIT MODAL


	// Delete this later
	// For opening and closing the modal when the button is clicked
	// should be in the specific problem page
	const [OPEN, SET_OPEN] = useState(false);


	// Delete this later
	// if submit button is click, call this.
	// should be in the specific problem page
	//
	// Purpose: Open the submission modal. Set the OPEN to true
	// Params: None
	// Returns: None
	const handle_open = () => SET_OPEN(true);


	// Purpose: Closing the submission modal. Set the OPEN to false
	// Params: None
	// Returns: None
	const handle_close = () => SET_OPEN(false);
	// ------------------------------------------------------




	// ------------------------------------------------------
	// HANDLING FILE UPLOAD


	// Purpose: SET_FILE will set the current uploaded answer of the constestant.
	//          FILES is the current file uploaded by the contestant.
	const [FILES, SET_FILE] = useState(null);


	// Purpose: Allows the file to be dropped in the designated area. Set the current file to the drop file  
	// Params: Current Event
	// Returns: None
	const handleDrop = (event) => {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files[0];
		SET_FILE(droppedFile);
	};

	// Purpose: Called when the BROWSE BUTTON is clicked. Set the uploaded file
	// Params: Current Event
	// Returns: None
	const handleFileInputChange = (event) => {
		const selectedFile = event.target.files[0];
		SET_FILE(selectedFile);
	};

	// Purpose: Allows the file to be dragged on designated area. Prvent the browser from opening the file
	// Params: Current Event
	// Returns: None
	const handleDragOver = (event) => {
		event.preventDefault();
	};
	// ------------------------------------------------------

  return (
    <Box>
      {/*
        Remove Later.
        Button to show Submission Modal.
      */}
      <Button 
        variant="contained" 
        sx={{
          width: "300px",
          height: "50px",
          marginTop: "20px",
          bgcolor: "primary.main", // Initial background color
          '&:hover': {
              bgcolor: "major.main" // Background color on hover
          }
        }}
        onClick={handle_open}
      >
        Click Me! Hehehe
      </Button>

      {/* Summission Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={OPEN}
        onClose={handle_close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >   
        {/* Fade in effect */}
        <Fade in={OPEN}>
          {/* Modal Overall Div */}
          <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            bgcolor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
          }}>

            {/* Div for title and close icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                marginBottom: "25px"
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h5"
                sx={{ color: "general.main" }}
              >
                Upload your answer
              </Typography>
              <CloseIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "general.main",
                  '&:hover': {
                    cursor: 'pointer',
                    color: "glass.main" 
                  }
                }}
                onClick={handle_close}
              />
            </Box>

            {/* Div that contains the drop down box */}
            <Box 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{ 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {
                // If there is an uploaded file
                FILES ? (
                  // drop down box
                  <Box
                    sx={{ 
                      border: `3px dashed`,
                      borderRadius: "10px", 
                      height: "100px",
                      width: "90%", 
                      borderColor: `rgba(64, 64, 64, 0.5)`,
                      display: "flex",
                      flexDirection: "rows",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingX: 4,
                    }}
                  >
                    {/* Div that contains the file name and file icon */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "rows",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <SourceIcon sx={{ height: 40, width: 40, color: "rgba(0, 0, 0, 0.5)" }} />
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h6" 
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          fontSize: "16px"
                        }}
                      >
                        {FILES.name}
                      </Typography>
                    </Box>

                    {/* Div that contains the status of the uploaded file*/}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "rows",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h6" 
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          fontSize: "16px", 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Uploaded
                      </Typography>
                      <PendingActionsIcon
                        sx={{
                          height: 25,
                          width: 25,
                          color: "rgba(0, 0, 0, 0.5)",
                          marginBottom: "7px"
                        }}
                      />
                    </Box>
                  </Box>
                ) 
                : 
                // No file uploaded
                (
                  // drop down box
                  <Box
                    sx={{ 
                      border: `3px dashed`,
                      borderRadius: "10px", 
                      height: "250px",
                      width: "90%", 
                      borderColor: `rgba(64, 64, 64, 0.5)`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* Div that contains the Drag and Drop title and file icon*/}
                    <SourceIcon sx={{ height: 80, width: 80, color: "rgba(0, 0, 0, 0.3)" }} />
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h6"
                      sx={{ color: "rgba(0, 0, 0, 0.3)", fontSize: "18px" }}
                    >
                      Drag and Drop Here
                    </Typography>    
                  </Box>
                )
              }
            </Box>
            
            {/* Contains the buttons for browsing files and submitting */}
            <Box
              sx={{
                display: 'flex',
                gap: 10,
                marginBottom: "20px",
                flexDirection: "rows",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Button for browsing files */}
              <label htmlFor="icon-button-file">
                <Button 
                  variant="contained" 
                  component="span"
                  sx={{
                    width: "200px",
                    height: "50px",
                    marginTop: "20px",
                    bgcolor: "primary.main",
                    '&:hover': {
                      bgcolor: "primary.light",
                    }
                  }}
                >
                    Browse
                </Button>
                <input
                  type="file"
                  id="icon-button-file"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </label>

              {   
                // If there is an uploaded file
                FILES ? (
                  <Button 
                    variant="contained" 
                    sx={{
                      width: "200px",
                      height: "50px",
                      marginTop: "20px",
                      bgcolor: "secondary.main",
                      '&:hover': {
                        bgcolor: "rgba(150, 30, 50, 1)",
                      }
                    }}
                  >
                    Submit
                  </Button>
                ) 
                : 
                // No file uploaded, disabled button
                (
                  <Button 
                    variant="contained" 
                    sx={{
                      width: "200px",
                      height: "50px",
                      marginTop: "20px",
                      bgcolor: "secondary.light",
                    }}
                    disabled
                  >
                    Submit
                  </Button>
                )
              }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default SubmitModal;