import { PowerupInfo } from '../models/powerup';
import { Team } from '../models/team';
import mongoose from 'mongoose';

const Team = mongoose.model("Team");
 
 /* Purpose: Activates immunity at the (used at the start of the round)
 * Params: { <String> id - team id }
 * Returns: success - true or false, and message if there is an error
 */
export const activateImmunity = async (id: string) => {
  try {
    const team = await Team.findById(id);
    const startTime = new Date();
    
    if(team.active_buffs.length > 0){
      let immuneBuff: PowerupInfo = team.active_buffs.find((buff: any) => buff.code === 'immune');

      if(immuneBuff){
        immuneBuff.startTime = startTime;
        immuneBuff.endTime = new Date(startTime.getTime() + immuneBuff.duration);

        await Team.updateOne({_id: id}, {
          $set: {
            "active_buffs": immuneBuff
          }
        })

        return ({
          success: true,
          powerup: immuneBuff
        });
      }
    }
    return ({
      success: true,
    });
  } catch (error) {
      return ({
          success: false,
          message: error
      });
  }
}