import { Router } from 'express';
import {
  createKarban,
  getAllKarbans,
  getKarbanById,
  getKarbanByIdAndCreateNewProject,
  createProjectNewTab,
  createProjectTabNewCard,
  deleteKarban,
  deleteKarbanProject,
  deleteKarbanProjectTab,
  deleteKarbanProjectTabCard,
  findAKarbanWithUsername,
} from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);
r.get('/find', findAKarbanWithUsername);
r.route('/:id').get(getKarbanById).delete(deleteKarban);
r.post('/:id/project', getKarbanByIdAndCreateNewProject);
r.route('/:id/project/:projectId')
  .post(createProjectNewTab)
  .delete(deleteKarbanProject);
r.route('/:id/project/:projectId/tab/:tabId')
  .post(createProjectTabNewCard)
  .delete(deleteKarbanProjectTab);
r.delete(
  '/:id/project/:projectId/tab/:tabId/card/:cardId',
  deleteKarbanProjectTabCard
);

export default r;
