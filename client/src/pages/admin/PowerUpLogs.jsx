import { DropdownSelect, Sidebar } from "../../components/index.js";
import {
  Box,
  Button,
  Stack,
  Switch,
  Typography
} from "@mui/material";


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const optionsRounds = [
  'Easy',
  'Medium',
  'Wager',
  'Hard',
]

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