import { Router } from 'express';
import { getAllProjects } from '../controllers/project';

const r = Router();

r.get('/', getAllProjects);

export default r;
