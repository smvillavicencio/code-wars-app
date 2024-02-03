import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material"

import { userDetailsContext } from '../../utils/UserDetailsProvider';

// Icons
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 250;


const Sidebar = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserDetails(null);
    navigate("/");
  };

  const isDisabled = () => {
    // if 
    return false
  };

  return (
    <Box>
      <Box
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh",

          // modify background styling
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: "rgba(179,179,179,0.25)",
          boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Sidebar Header */}
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center '}}>
          <Typography variant="h4">CODE WARS</Typography>
          <Typography variant="h5">Admin</Typography>
        </Box>
        <Toolbar />

        {/* Sidebar Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="major"
            size="large"
            onClick={() => { navigate("/admin/general") }}
            startIcon={<SettingsIcon />}
            sx={{
              width: "85%",
              '&:hover': {
                bgcolor: "major.light",
                color: "general.main",
              }
            }}
          >
            General Options
          </Button>
          
          <Button
            variant="contained"
            color="major"
            size="large"
            onClick={() => { navigate("/admin/logs") }}
            startIcon={<BoltIcon />}
            sx={{
              marginTop: "2em",
              width: "85%",
              '&:hover': {
                bgcolor: "major.light",
                color: "general.main",
              }
            }}
          >
            Power-up Logs
          </Button>
        </Box>

        {/* Logout Button */}
        <List
          onClick={handleLogout}
          sx={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            marginBottom: "2em",
          }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: "rgba(111,111,111,.75)"} }}>
              <ListItemIcon>
                <LogoutIcon sx={{ transform: "scaleX(-1)", color: '#fff', marginLeft: '.25em' }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  '& .MuiListItemText-primary': {
                    color: '#fff',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>

      </Box>
    </Box>
  )
};

export default Sidebar;