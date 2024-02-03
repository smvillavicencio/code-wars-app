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

const GeneralOptionsPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Stack spacing={7} sx={{ margin:'4em', width:"100%" }}>

        {/* General Options */}
        <Box>
          <Typography variant="h4">GENERAL</Typography>  

          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '4em',
              marginTop: '2em',
            }}
          >
            {/* Labels */}
            <Stack spacing={4} sx={{ marginRight: '2em' }}>
              <span>Freeze all screens</span>
              <span>Logout all sessions</span>
              <span>Move Round</span>
            </Stack>

            {/* Buttons */}
            <Stack spacing={3} sx={{ width: '15%' }}>
              {/* Toggle */}
              <Switch />

              {/* Apply Button */}
              <Button
                variant="contained"
                color="major"
                sx={{
                  '&:hover': {
                    bgcolor: "major.light",
                    color: "general.main",
                  }
                }}
              >
                Apply
              </Button>

              {/* Dropdown Select */}
              <DropdownSelect
                isDisabled={false}
                label="Select Round"
                minWidth="100px"
                options={optionsRounds}
              />
            </Stack>
          </Typography>
        </Box>

        {/* Leaderboard */}
        <Box>
          <Typography variant="h4">LEADERBOARD</Typography>
        </Box>
        
      </Stack>
    </Box>
  )
};

export default GeneralOptionsPage;