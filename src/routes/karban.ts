import { Router } from 'express';
import {
  createKarban,
  getAllKarbans,
  getKarbanById,
  getKarbanByIdAndCreateNewProject,
  createProjectNewTab,
  createProjectTabNewCard,
} from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);
r.get('/:id', getKarbanById);
r.post('/:id/project', getKarbanByIdAndCreateNewProject);
r.post('/:id/project/:projectId', createProjectNewTab);
r.post('/:id/project/:projectId/tab/:tabId', createProjectTabNewCard);

export default r;
