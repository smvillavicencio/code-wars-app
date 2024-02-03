import {
  Box,
  Typography
} from "@mui/material";


const Timer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: "325px",
        alignItems: "center",
      }}
    >
      <Typography
        noWrap
        color="primary.contrastText"
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: "1.4rem",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <span>TIMER</span>
      </Typography>

      <Typography noWrap variant="h3">
        <span>00:00:00</span>
      </Typography>
    </Box>
  )
};

export default Timer;