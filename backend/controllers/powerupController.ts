import { Request, Response } from 'express';
import PowerupModel, {Powerup} from '../models/powerup';


// Hardcoded team
let team = { '_id': {'$oid':'65b3bc99f1b97b7835471279'},
            'team_name':'Team2',
            'password':'$2b$10$WdIMVgxu37P9RIu4yP99uuMPCByYailH5BNcPTeibULeHR1rHTjWa',
            'members':'Dim, En, Fin',
            'score':180,
            'total_points_used':0,
            'activated_buffs':['65b3bc80f1b97b783547b312'],
            'activated_own_debuffs':['65b3bc80f1b97b783547b312'],
            'applied_debuffs_to':['65b3bc80f1b97b783547b312'],
            'availablePowerups':['65b3bc80f1b97b783547b312'],
            'debuffs_afflicted':['65b0fa6430b35b5d6790ccc3'],
            'debuffs_from':['65b3bc80f1b97b7835471274'],
            '__v':0
          };

let target = { '_id':{'$oid':'65b3bc80f1b97b7835471274'},
               'team_name':'Team1',
               'password':'$2b$10$WY3SiJGA10W.OJlSNJYdoOqIwnlflEJYLuVww/cAZdhkO1jzO.jQm',
               'members':'Ade, Ben, Cole',
               'score':600,
               'total_points_used':0,
               'activated_buffs':['65b0f81a30b35b5d6790c213'],
               'activated_own_debuffs':['65b3bc80f1b97b783547b312'],
               'applied_debuffs_to':['65b3bc80f1b97b783547b312'],
               'availablePowerups':['65b3bc80f1b97b783547b312'],
               'debuffs_afflicted':['65b0fa9a30b35b5d6790ccc4'],
               'debuffs_from':['65b3bc99f1b97b7835471279'],
               '__v':0
             };

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
        message: 'Powerup not found',
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
    // const team: Team | null = await TeamModel.findById(req.body.team_id); 

    if (team) {
      const powerups: Powerup[] = await PowerupModel.find();

      // Get a list of powerups that can be afforded by the team
      let availablePowerups: Powerup[] = powerups.filter((powerup: Powerup) => team.score >= powerup.cost);
      
      // Check availability of Dispel and Immunity 4 (due to % costs)
      for (const powerup of availablePowerups) {
        if (powerup.code === 'dispel') {
          const index = availablePowerups.indexOf(powerup);
          // Check if there are debuffs that can be dispelled
          if (team.debuffs_afflicted.length === 0) {
            availablePowerups.splice(index, 1);
          } else {
            for (const debuffId of team.debuffs_afflicted) {
              const debuff = await PowerupModel.findById(debuffId).select('cost');
              // Check if the points of the team is sufficient to buy Dispel (120% of the debuff's cost)
              if (debuff && (1.2 * debuff.cost > team.score)) {
                availablePowerups.splice(index, 1);
                break;
              }
            }
          }
        } else if (powerup.code === 'immune4') {
          // Check if the points of the team is sufficient to buy Immunity IV (1000 + 10% team's score)
          if (powerup.cost + 0.1 * team.score > team.score) {
            const index = availablePowerups.indexOf(powerup);
            availablePowerups.splice(index, 1);
          }
        }
      }
      return res.send({
        success: true, 
        message: availablePowerups,
      });
    } else {
      return res.send({
        success: false,
        message: 'Team not found',
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
 * Purpose: Buys and activates a powerup
 *          Note: timed powerup is not yet implemented
 * Params: None
 * Request body fields: {
 *                          team_id: String   (required)
 *                          powerup: Powerup  (required)
 *                          target_id: String (if debuff)
 *                          debuff_to_dispel_id: String (if buff is dispel)
 *                      }
 * Returns: An Array<Powerup> of all powerups afforded by the team/user
 */
export const buy_powerup = async (req: Request, res: Response) => {
  try {
    // const team: Team | null = await TeamModel.findById(req.body.team_id); 
    if(team) {
      console.log(req.body.powerup.code);
      if(req.body.powerup.type == 0) { // DEBUFF
        // ASSUMPTION: Check possible targets was already done before sending the request for buy powerup
        
        // TO DO: Create constants for the arrays (buffs & debuffs) used in includes()
        // Check if it is really a debuff
        if(['stun', 'editor', 'frosty'].includes(req.body.powerup.code)) { 
          // NOTE: target is hardcoded for now
          // const target: Team | null = await TeamModel.findById(req.body.target_id).;

          if(target){
            // Checker if target does not have the powerup in their debuffs afflicted
            if(target.debuffs_afflicted.includes(req.body.powerup._id)){
              return res.send({
                success: false,
                message: `Your target team is still debuffed with ${req.body.powerup.name}. Debuffs cannot be stacked.` 
              });
            }
            // Checker if target team has immunity
            let isTargetImmune: Boolean = false;
            for(const targetBuffId of target.activated_buffs){
              console.log(targetBuffId);
              const targetBuff = await PowerupModel.findById(targetBuffId).select('code');
              if(targetBuff && targetBuff.code.startsWith('immune')){
                isTargetImmune = true;
                break;
              }
            }

            // TO DO: Update this in the database using mongoose when teams are no longer hardcoded
            // Adjust total points used and score accordingly
            team.total_points_used += req.body.powerup.cost;
            team.score -= req.body.powerup.cost;

            if(!isTargetImmune) { // Only add to target's debuffs_afflicted if target is not immune
              target.debuffs_afflicted.push(req.body.powerup._id);
              target.debuffs_from.push(req.body.team_id);

              console.log(target);
              console.log(team);

              return res.send({ 
                success: true,
                message: 'Debuff successfully applied to the other team'
              });
            } else { // Do not apply debuff if target is immune
              console.log(target);
              console.log(team);

              return res.send({
                success: true,
                message: 'The other team has an active immunity'
              });
            }
          } else {
            return res.send({
              success: false,
              message: 'Target team not found',
            });
          }
        } else {
          return res.send({
            success: false,
            message: 'Unknown powerup',
          });
        }
      } else if(req.body.powerup.type == 1) { // BUFF
        if(req.body.powerup.code == 'dispel'){ // DISPEL
          // Retrieve the cost of the debuff to be dispelled
          const debuffToDispel = await PowerupModel.findById(req.body.debuff_to_dispel_id).select('cost');
          
          if (debuffToDispel) {
            // TO DO: Update this in the database using mongoose when teams are no longer hardcoded
            
            // Adjust total points used and score accordingly
            team.total_points_used += (1.2*debuffToDispel.cost);
            team.score -= (1.2*debuffToDispel.cost);
            
            // Remove the debuff from the team
            const index = target.debuffs_afflicted.indexOf(req.body.debuff_to_dispel_id);
            team.debuffs_afflicted.splice(index, 1);
            team.debuffs_from.splice(index,1);

            console.log(target);
            console.log(team);

            return res.send({
                success: true,
                message: 'Dispel successfully activated'
              });
          } else {
            return res.send({
              success: false,
              message: 'Debuff to dispel not found',
            });
          }
        } else if (['immune1', 'immune2', 'immune3', 'immune4', 'unchain'].includes(req.body.powerup.code)){ // Check if it is really a buff aside from dispel
          // TO DO: Update this in the database using mongoose when teams are no longer hardcoded

          // Adjust total points used and score accordingly
          team.total_points_used += req.body.powerup.cost;
          team.score -= req.body.powerup.cost;

          // Add to the list of activated buffs
          team.activated_buffs.push(req.body.powerup._id);

          console.log(team);
          return res.send({
            success: true,
            message: `${req.body.powerup.name} successfully activated`
          });
        } else {
          return res.send({
            success: false,
            message: 'Unknown powerup',
          });
        }
      } else {
        return res.send({
          success: false,
          message: 'Invalid powerup type',
        });
      }
    } else {
      return res.send({
        success: false,
        message: 'Team not found',
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