import { Response, Request } from 'express';
import Maplify from '../models/Maplify';
import { MaplifyResType } from '../types';

//* @desc GET - get all maplify data
//* @access PUBLIC
export const getAllMaplifyDocs: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  const data = await Maplify.find();
  res.json({ data, success: true, length: data.length });
};

//* @desc POST - Create a maps data
//* @access ACCESS KEY
export const createMaplifyDoc: (
  req: Request,
  res: Response
) => Promise<Response<MaplifyResType>> = async (
  req: Request,
  res: Response
) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    const data = Maplify.build(req.body);
    await data.save();
    return res.json({ data, success: true });
  }
  throw new Error('Access Denied!!!');
};

//* @desc DELETE - Delete a maps data
//* @access ACCESS KEY
export const deleteMaplifyDoc: (
  req: Request,
  res: Response
) => Promise<Response<MaplifyResType>> = async (
  req: Request,
  res: Response
) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    await Maplify.findOneAndDelete({ _id: req.params.mapID });
    return res.json({ success: true, msg: 'Successfully Deleted...' });
  }
  throw new Error('Access Denied!!!');
};
