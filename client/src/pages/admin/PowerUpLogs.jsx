import { Sidebar } from "../../components/index.js";
import {
  Box,
  Stack,
  Typography
} from "@mui/material";



const PowerUpLogs = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Stack spacing={7} sx={{ margin:'4em', width:"100%" }}>

        {/* Power-up Logs */}
        <Box>
          <Typography variant="h4">POWER-UP LOGS</Typography>  
        </Box>
      </Stack>
    </Box>
  )
};

export default PowerUpLogs;