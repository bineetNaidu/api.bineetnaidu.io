import { Router } from 'express';
import Maplify from '../models/Maplify';

const router = Router();

//* @desc GET - get all maplify data
//* @access PUBLIC
router.get('/', async (req, res) => {
  const data = await Maplify.find();
  res.json({ data, success: true, length: data.length });
});

//* @desc POST - Create a maps data
//* @access ACCESS KEY
router.post('/', async (req, res) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    const data = new Maplify(req.body);
    await data.save();
    return res.json({ data, success: true });
  }
  throw new Error('Access Denied!!!');
});

//* @desc DELETE - Delete a maps data
//* @access ACCESS KEY
router.delete('/:mapID', async (req, res) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    await Maplify.findOneAndDelete({ _id: req.params.mapID });
    return res.json({ success: true, msg: 'Successfully Deleted...' });
  }
  throw new Error('Access Denied!!!');
});

export default router;
