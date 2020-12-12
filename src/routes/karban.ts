import { Router } from 'express';
import {
  createKarban,
  getAllKarbans,
  getKarbanById,
  getKarbanByIdAndCreateNewProject,
  createProjectNewTab,
  createProjectTabNewCard,
  deleteKarban,
} from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);
r.route('/:id').get(getKarbanById).delete(deleteKarban);
r.post('/:id/project', getKarbanByIdAndCreateNewProject);
r.post('/:id/project/:projectId', createProjectNewTab);
r.post('/:id/project/:projectId/tab/:tabId', createProjectTabNewCard);

export default r;
