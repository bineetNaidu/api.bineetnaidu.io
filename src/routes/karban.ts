import { Router } from 'express';
import {
  createKarban,
  getAllKarbans,
  getKarbanById,
  getKarbanByIdAndCreateNewProject,
} from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);
r.get('/:id', getKarbanById);
r.post('/:id/project', getKarbanByIdAndCreateNewProject);

export default r;
