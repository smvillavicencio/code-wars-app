import { Request, Response } from 'express';

export const getSampleData = (req: Request, res: Response) => {
  res.json({ message: 'Sample data from the controller' });
};
