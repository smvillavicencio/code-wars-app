import { Request, Response } from 'express';
import PowerupModel, {Powerup} from '../models/powerup';

/*
 * Purpose: Fetches all powerups
 * Params: None
 * Returns: An Array<Powerup> of all powerups and its information
 */
export const get_all_powerups = async (req: Request, res: Response) => {
  try {
    const powerups: Powerup[] = await PowerupModel.find();
    return res.send(powerups);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerups:', error);
    return res.send({
      success: false,
      message: error,
    });
  }
};

/*
 * Purpose: Fetches powerups by type
 * Params: type - buff or debuff [0 - debuff, 1 - buff]
 * Returns: An Array<Powerup> of all powerups and its information
 */
export const get_powerups_by_type = async (req: Request, res: Response) => {
  try {
    const powerups: Powerup[] = await PowerupModel.find({type: req.params.type});
    return res.send(powerups);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerups:', error);
    return res.send({
      success: false,
      message: error,
    });
  }
};

/*
 * Purpose: Fetches powerups by id
 * Params: Powerup id
 * Returns: A Powerup object
 */
export const get_powerup_by_id = async (req: Request, res: Response) => {
  try {
    const powerup: Powerup | null = await PowerupModel.findById(req.params.id);
    
    if(powerup){
      return res.send({
        success: true,
        message: powerup,
      });
    } else {
      return res.send({
        success: false,
        message: "Powerup not found",
      });
    }
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerup:', error);
    return res.send({
      success: false,
      message: error,
    });
  }
};

/*
 * Purpose: Fetches powerups afforded by the team/user
 * Params: None
 * Returns: An Array<Powerup> of all powerups afforded by the team/user
 */
export const get_available_powerups = async (req: Request, res: Response) => {
  try {
    // const team: Team | null = await TeamModel.findById(req.body.teamId); 

    // Hardcoded team
    const team = { "_id": {"$oid":"65b3bc99f1b97b7835471279"},
                "team_name":"Team2",
                "password":"$2b$10$WdIMVgxu37P9RIu4yP99uuMPCByYailH5BNcPTeibULeHR1rHTjWa",
                "members":"Dim, En, Fin",
                "score":180,
                "total_points_used":0,
                "activated_buffs":[],
                "activated_own_debuffs":[],
                "applied_debuffs_to":[],
                "available_powerups":[],
                "debuffs_afflicted":['65b0fa6430b35b5d6790ccc3'],
                "debuffs_from":[],
                "__v":0
              };
    
    if (team) {
      const powerups: Powerup[] = await PowerupModel.find();

      // Get a list of powerups that can be afforded by the team
      let available_powerups: Powerup[] = powerups.filter((powerup: Powerup) => team.score >= powerup.cost);
      
      // Check availability of Dispel and Immunity 4 (due to % costs)
      for (const powerup of available_powerups) {
        if (powerup.code === 'dispel') {
          const index = available_powerups.indexOf(powerup);
          // Check if there are debuffs that can be dispelled
          if (team.debuffs_afflicted.length === 0) {
            available_powerups.splice(index, 1);
          } else {
            for (const debuff_id of team.debuffs_afflicted) {
              const debuff = await PowerupModel.findById(debuff_id).select('cost');
              // Check if the points of the team is sufficient to buy Dispel (120% of the debuff's cost)
              if (debuff && (1.2 * debuff.cost > team.score)) {
                available_powerups.splice(index, 1);
                break;
              }
            }
          }
        } else if (powerup.code === 'immo4') {
          // Check if the points of the team is sufficient to buy Immunity IV (1000 + 10% team's score)
          if (powerup.cost + 0.1 * team.score > team.score) {
            const index = available_powerups.indexOf(powerup);
            available_powerups.splice(index, 1);
          }
        }
      }

      return res.send({
        success: true, 
        message: available_powerups
      });
    } else {
      return res.send({
        success: false,
        message: "Team not found",
      });
    }
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerup:', error);
    return res.send({
      success: false,
      message: error,
    });
  }
};