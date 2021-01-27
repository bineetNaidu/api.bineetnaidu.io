import { Router } from 'express';
import isAccessable from '../middlewares/isAccessable';
import {
  getAllProjects,
  getProjectByID,
  createProject,
  updateProject,
} from '../controllers/project';

const r = Router();

r.get('/', getAllProjects);
r.post('/', isAccessable, createProject);
r.get('/:projectId', getProjectByID);
r.put('/:projectId', isAccessable, updateProject);

export default r;
