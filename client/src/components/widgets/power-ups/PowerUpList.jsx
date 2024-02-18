/* eslint-disable */ 
import { Box } from '@mui/material';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PanToolIcon from '@mui/icons-material/PanTool';

import PowerUpItem from './PowerUpItem';
import PowerUpDetails from './PowerUpDetails';


import { buffs, debuffs } from 'utils/dummyData';


  
/**
 * Purpose: This component displays the collapsible ui element after the buy power-up popover is clicked on the view all problems page.
 * Params:
 *    <String>    type - receives the type of power-up clicked.
 *    <Boolean>   openDetails - tells whether to display the list of power-ups or the details of a selected power-up.
 *    <Function>  handleReturn - used to get back to the list of buffs or debuffs from specific powerup description.
 *    <Function>  handleClick - handler for event when a power-up has been selected.
 *    <Object>    selectedPowerUp - state containing the details of the power-up selected.
 */
const PowerUpList = ({
  type,
  openDetails,
  handleReturn,
  handleClick,
  selectedPowerUp
}) => {

  /**
   * Displays the icons for each power-up
   */
  const itemIcons = ({ name }) => {
    if (name == "Dispel") {
      return <AutoAwesomeIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#85eeff',
        }}
      />
    } else if (name === "Immunity I") {
      return <LooksOneIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#ff9cee',
        }}
      />
    } else if (name === "Immunity II") {
      return <LooksTwoIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#b28dff',
        }}
      />
    } else if (name === "Immunity III") {
      return <Looks3Icon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#e7ffac',
        }}
      />
    } else if (name === "Immunity IV") {
      return <Looks4Icon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#97a2ff',
        }}
      />
    } else if (name === "Unchain") {
      return <NoEncryptionIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#bffcc6',
        }}
      />
    } else if (name === "Stun") {
      return <ElectricBoltIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#85eeff',
        }}
      />
    } else if (name === "Editor") {
      return <LaptopChromebookIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#ff9cee',
        }}
      />
    } else if (name === "Frosty Hands") {
      return <PanToolIcon
        sx={{
          marginLeft: '20px',
          marginRight: '10px',
          color: '#e7ffac',
        }}
      />
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(0, 10, 30, 3)',
        gap: 2,
        paddingY: 3,
      }}
    >
      {!openDetails ?
        <>
          {/* Showing the list of buffs */}
          { type == "buff" ?
            <>
              {/* Show the list of buffs */}
              { buffs.map((item, index) => (
                <PowerUpItem
                  key={index}
                  icon={itemIcons(item)}
                  item={item}
                  handleClick={handleClick}
                />
              ))}
            </> :
            <>
              {/* Show the list of debuffs */}
              { debuffs.map((item, index) => (
                <PowerUpItem
                  key={index}
                  icon={itemIcons(item)}
                  item={item}
                  handleClick={handleClick}
                />
              ))}
            </>
          }
        </> :
        <>
          {/* Show details of selected power-up */}
          <PowerUpDetails
            type={selectedPowerUp.type}
            handleReturn={handleReturn}
            powerUp={selectedPowerUp}
          />
        </>
      }
    </Box>
  )
};

export default PowerUpList;