import { Router } from 'express';
import isAccessable from '../middlewares/isAccessable';
import {
  getAllProjects,
  getProjectByID,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project';

const r = Router();

r.get('/', getAllProjects);
r.post('/', isAccessable, createProject);
r.get('/:projectId', getProjectByID);
r.put('/:projectId', isAccessable, updateProject);
r.delete('/:projectId', isAccessable, deleteProject);

export default r;
