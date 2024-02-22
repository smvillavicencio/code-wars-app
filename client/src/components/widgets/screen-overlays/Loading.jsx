/* eslint-disable */ 
import { Box, Typography } from "@mui/material";

const Loading = () => {
	return (
		<Box  
            sx={{
                display: 'flex', 
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#FFF',
                }}	
            >		
            <Typography 
                variant="h4"
                sx={{
                    whiteSpace: 'pre-wrap',
                    textAlign: 'center'
                }}
            >
                LOADING...
            </Typography>
            </Box>
        </Box>
	)
}

export default Loading;