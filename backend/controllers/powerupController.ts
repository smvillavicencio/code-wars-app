import { Request, Response } from 'express';
import PowerupModel, {Powerup} from '../models/powerup';

export const getPowerupsByType = async (req: Request, res: Response) => {
  try {
    const powerups: Powerup[] = await PowerupModel.find({type: req.body.type});
    return res.send(powerups);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerups:', error);
    throw error;
  }
};

export const getPowerupById = async (req: Request, res: Response) => {
  try {
    var powerup = await PowerupModel.findById(req.params.id);
    return res.send(powerup);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching powerups:', error);
    throw error;
  }
};
