import { Router } from 'express';
import { getAllKarbans } from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans);

export default r;
