import { Router } from 'express';
import {
  createKarban,
  getAllKarbans,
  getKarbanById,
} from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);
r.get('/:id', getKarbanById);

export default r;
