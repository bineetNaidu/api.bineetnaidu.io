import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getAllKarbans = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karbans = await Karban.find({});
  res.json({ success: true, karbans });
};

export const createKarban = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, passcode } = req.body;
  const karban = Karban.build(passcode, username);
  await karban.save();
  res.status(201).json({ success: true, karban });
};

export const getKarbanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  res.json({ success: true, karban });
};
