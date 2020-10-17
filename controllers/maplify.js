/* eslint-disable no-console */
/* eslint-disable import/extensions */
import Maplify from '../models/Maplify.js';

// @desc GET - get all maps data
// @access PUBLIC
export const getMapsData = async (req, res) => {
  const data = await Maplify.find({});
  res.json({ data, success: true, length: data.length });
};

// @desc POST - Create a maps data
// @access ACCESS KEY
export const createMapData = async (req, res) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    const data = new Maplify(req.body);
    res.json({ data, success: true, length: data.length });
  }
  throw new Error('Access Denied!!!');
};

// @desc DELETE - Delete a maps data
// @access ACCESS KEY
export const deleteMapData = async (req, res) => {
  if (req.query.accessKey === process.env.ACCESS_KEY) {
    await Maplify.findOneAndDelete(req.params.mapID);
    return res.json({ success: true, msg: 'Successfully Deleted...' });
  }
  throw new Error('Access Denied!!!');
};
