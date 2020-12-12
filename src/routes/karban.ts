import { Router } from 'express';
import { createKarban, getAllKarbans } from '../controllers/karban';

const r = Router();

r.route('/').get(getAllKarbans).post(createKarban);

export default r;
