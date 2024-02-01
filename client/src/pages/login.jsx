import { Box, TextField, Button, Typography } from "@mui/material";
import SponsorCarousel from "../components/carousel/SponsorCarousel";

const LogIn = () => {

    return(
        <Box sx={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "16%",
            marginTop: "5%",
            zIndex: 1,
        }}> 
            <Box sx={{ 
                width: 450, 
                height: 450, 
                borderRadius: "10px",
                p: 2,
                "& .MuiTextField-root": { marginBottom: "20px", width: "300px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "35px",
                bgcolor: "rgba(255, 255, 255, 0.3)", // White with opacity
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(10px)", // For Safari support
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)", // Black shadow
            }}>
                {/* LogIn Title */}
                <Typography variant="h2" component="h2" sx={{marginBottom: "60px", color: "major.light"}}>
                    Log In
                </Typography>
                
                {/* Username */}
                <TextField
                    id="filled-basic"
                    label="Username"
                    variant="filled"
                    sx={{
                        '& .MuiFormLabel-root': {
                            color: 'rgba(255, 255, 255, 0.5)', // Label color with reduced opacity
                        },

                        '& .MuiFilledInput-root': {
                            color: 'rgba(255, 255, 255, 0.8)', // White with reduced opacity
                            '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.5)', // Placeholder color with reduced opacity
                            },
                            '&:before': {
                                borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // Underline color with reduced opacity
                            },
                            '&:hover:before': {
                                borderBottom: '2px solid rgba(255, 255, 255, 0.5)', // Underline on hover
                            },
                            '&.Mui-focused:before': {
                                borderBottomColor: 'white', // White color for the underline when focused
                            },
                            '&.Mui-focused:after': {
                                borderBottomColor: 'major.main', // Border color when focused and input is not empty
                            },
                        },
                    }}
                />

                {/* Password */}
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    sx={{
                        '& .MuiFormLabel-root': {
                            color: 'rgba(255, 255, 255, 0.5)', // Label color with reduced opacity
                        },

                        '& .MuiFilledInput-root': {
                            color: 'rgba(255, 255, 255, 0.8)', // White with reduced opacity
                            '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.5)', // Placeholder color with reduced opacity
                            },
                            '&:before': {
                                borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // Underline color with reduced opacity
                            },
                            '&:hover:before': {
                                borderBottom: '2px solid rgba(255, 255, 255, 0.5)', // Underline on hover
                            },
                            '&.Mui-focused:before': {
                                borderBottomColor: 'white', // White color for the underline when focused
                            },
                            '&.Mui-focused:after': {
                                borderBottomColor: 'major.main', // Border color when focused and input is not empty
                            },
                        },
                    }}
                />

                 {/* Sign In Button */}
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
                >
                    Sign In
                </Button>
            </Box>
            
            {/* Sponsor carousel in LogIn Page */}
            <Box sx={{
                width: 470, 
                height: 220, 
            }}>
                <SponsorCarousel />

            </Box>


        </Box>
    );
}

export default LogIn;