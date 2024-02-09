/* eslint-disable */ 

import { Box } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Buff from "./Buff.jsx";
import Debuff from "./Debuff.jsx";

const BuyPowerUpsModal = ({seePowerups}) => {

  // For Showing the Buffs
  const [showBuffs, setShowBuffs] = useState(false);

  // For Showing the Debuffs
  const [showDebuffs, setShowDebuffs] = useState(false);

  // For Viewing the Specific Powerup Details - for both buffs and debuffs
  const[seeDetails, setSeeDetails] = useState(false);   // condition to show or not
  const[powerUp, setPowerUp] = useState(null);          // the specific powerup object
  

  // Purpose: Show the debuff list when debuff is clicked
  // Params: None
  // Returns: None
  const handleClickedDebuff = () => {
    if(showBuffs && !showDebuffs) setShowBuffs(!showBuffs);
    setShowDebuffs(!showDebuffs);
    setSeeDetails(false);
  }


  // Purpose: Show the buff list when debuff is clicked
  // Params: None
  // Returns: None
  const handleClickedBuff = () => {
    if(!showBuffs && showDebuffs) setShowDebuffs(!showDebuffs);
    setShowBuffs(!showBuffs);
    setSeeDetails(false);
  }


  // Purpose: Get the specific powerup to view description
  // Params: None
  // Returns: None
  const handleClickedPowerup = (powerup) => {
    setPowerUp(powerup);
  }


  // Purpose: Get back to the list of buffs or debuffs from specific powerup description
  // Params: None
  // Returns: None
  const handleBack = () => {
    setSeeDetails(false);
    setPowerUp(null);
  }

  // Purpose: Reset the view of buffs and debuffs when powerup modal is closed
  useEffect(() => {

    if(seePowerups) return;

    setShowBuffs(false);
    setShowDebuffs(false);

  }, [seePowerups]);


  // Purpose: To view the details of selected powerups
  useEffect(() => {

    if(powerUp == null) return;

    setSeeDetails(true);
  }, [powerUp]);

  if(!seePowerups) return null;
  return(
      <Box 
          sx={{
              width: "400px",
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 20,
              marginTop: "80px",
              marginRight: "25px",
              borderRadius: "10px",
              border: "2px solid rgba(0, 159, 172, 0.4)",
              bgcolor: 'rgba(0, 0, 10, 1)',                
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',                 
              boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
          }}
      >

        {/* Main Div that contain the Buffs title */}
        <Box
        sx={{
          width: "100%",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: "pointer",
          color: "white.main",
          "&:hover": {
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            color: "major.main",
          },
        }}
        onClick={handleClickedBuff}
        >
          {/* Sub Div that contains the Buff title and arrow icon */}
          <Box
          sx={{
            width: "80%",
            paddingY: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: "18px",
          }}
          >
            {/* Buff title */}
            Buff

            {/* Arrow Icons
                    - pointing upwards if not showing the list of buffs
                    - pointing downwards if showing the list of buffs
            */}
            {
              showBuffs ? (
                <KeyboardArrowDownIcon 
                sx={{
                  width: '25px',
                  height: '25px',
                }}
                />
              )
              :
              (
                <KeyboardArrowUpIcon 
                sx={{
                  width: '25px',
                  height: '25px',
                }}
                />
              )
            }
          </Box>

        </Box>

        {/* The Buffs List */}
        <Buff 
        showBuffs={showBuffs}
        seeDetails={seeDetails}
        handleClickedPowerup={handleClickedPowerup}
        handleBack={handleBack}
        powerUp={powerUp}
        />


        {/* Main Div that contain the Debuffs title */}
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'white.main',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            color: 'major.main',
          },
          borderTop: '1px solid rgba(0, 159, 172, 0.1)'
        }}
        onClick={handleClickedDebuff}
        >
          {/* Sub Div that contains the Debuffs title and arrow icon */}
          <Box
          sx={{
            width: '80%',
            paddingY: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: '18px',
          }}
          >
            {/* Debuff title */}
            Debuff

            {/* Arrow Icons
                    - pointing upwards if not showing the list of debuffs
                    - pointing downwards if showing the list of debuffs
            */}
            {
              showDebuffs ? (
                <KeyboardArrowDownIcon 
                sx={{
                  width: '25px',
                  height: '25px',
                }}
                />
              )
              :
              (
                <KeyboardArrowUpIcon 
                sx={{
                  width: '25px',
                  height: '25px',
                }}
                />
              )
            }
          </Box>

        </Box>
        
        {/* The Debuffs List */}
        <Debuff
        showDebuffs={showDebuffs}
        seeDetails={seeDetails}
        handleClickedPowerup={handleClickedPowerup}
        handleBack={handleBack}
        powerUp={powerUp} 
        />


      </Box>
  );
}

export default BuyPowerUpsModal;