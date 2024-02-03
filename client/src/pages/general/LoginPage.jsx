import { Box, TextField, Button, Typography } from "@mui/material";
import { SponsorCarousel } from "../../components/index.js";

import LoginBackground from "../../assets/LoginBackground.png";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

const LoginPage = () => {

    return (
        <Box
            style={{
              backgroundImage: `url(${LoginBackground})`,
              backgroundSize: "cover",
              height: "100vh",
              color: "#f5f5f5"
            }}
        >
            <Box sx={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "16%",
                marginTop: "80px",
                zIndex: 1,
            }}> 
                <Box sx={{ 
                    width: 450, 
                    height: 450, 
                    borderRadius: "20px",
                    p: 2,
                    "& .MuiTextField-root": { marginBottom: "20px", width: "260px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "35px",
                    bgcolor: "rgba(255, 255, 255, 0.1)", // White with opacity
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)", // For Safari support
                    boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)", // Black shadow
                }}>
                    {/* LogIn Title */}
                    <Typography variant="h4" component="h4" sx={{marginBottom: "60px", color: "major.light"}}>
                        Log In
                    </Typography>
                    
                    {/* Username */}
                    <Box>
                        <PersonIcon sx={{bgcolor: "rgba(255, 255, 255, 0.15)", borderRadius: "5px", width: "25px", height: "25px", p: 2, marginRight: "10px"}} />

                        <TextField
                            id="filled-basic"
                            label="Username"
                            variant="filled"
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.15)",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                                '& .MuiFormLabel-root': {
                                    color: 'glass.main',
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
                    </Box>
                    
                    {/* Password */}
                    <Box>
                        <KeyIcon sx={{bgcolor: "rgba(255, 255, 255, 0.15)", borderRadius: "5px", width: "25px", height: "25px", p: 2, marginRight: "10px"}} />
                        
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.15)",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                                '& .MuiFormLabel-root': {
                                    color: 'glass.main',
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

                    </Box>

                    {/* Sign In Button */}
                    <Button 
                        variant="contained" 
                        sx={{
                            width: "320px",
                            height: "50px",
                            marginTop: "20px",
                            bgcolor: "major.main", // Initial background color
                            '&:hover': {
                                bgcolor: "major.light", // Background color on hover
                                color: "general.main",
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
                
                {/* Sponsor carousel in LogIn Page */}
                <Box sx={{
                    width: 480, 
                }}>
                    <SponsorCarousel />

                </Box>


            </Box>
        </Box>
    );
}

export default LoginPage;