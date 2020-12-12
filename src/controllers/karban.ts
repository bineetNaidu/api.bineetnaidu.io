import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getAllKarbans = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karbans = await Karban.find({});
  res.json({ success: true, karbans });
};
