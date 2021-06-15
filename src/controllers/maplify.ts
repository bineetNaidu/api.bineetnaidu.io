import { Response, Request } from 'express';
import Maplify from '../models/Maplify';

//* @desc GET - get all maplify data
//* @access PUBLIC
export const getAllMaplifyDocs = async (_req: Request, res: Response) => {
  const data = await Maplify.find();
  res.json({ data, success: true, length: data.length });
};

//* @desc POST - Create a maps data
//* @access ACCESS KEY
export const createMaplifyDoc = async (req: Request, res: Response) => {
  const data = Maplify.build(req.body);
  await data.save();
  res.json({ data, success: true });
};

//* @desc DELETE - Delete a maps data
//* @access ACCESS KEY
export const deleteMaplifyDoc = async (req: Request, res: Response) => {
  await Maplify.findOneAndDelete({ _id: req.params.mapID });
  res.json({ success: true, msg: 'Successfully Deleted...' });
};
