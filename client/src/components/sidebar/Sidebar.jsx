// Icons
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import LogoutIcon from '@mui/icons-material/Logout';

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material"


const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          // modify background styling
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "rgba(179,179,179,0.25)",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          },
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
            startIcon={<SettingsIcon />}
            sx={{
              width: "90%",
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
            startIcon={<BoltIcon />}
            sx={{
              marginTop: "2em",
              width: "90%",
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

      </Drawer>
    </Box>
  )
};

export default Sidebar;