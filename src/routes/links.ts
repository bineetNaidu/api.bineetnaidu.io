import { Router } from 'express';
import {
  LinkValidations,
  createLink,
  deleteLink,
  updateLink,
  getAllLinks,
} from '../controllers/links';
import isAccessable from '../middlewares/isAccessable';
import validateRequest from '../middlewares/validateRequest';

const r = Router();

r.get('/', getAllLinks);
r.post('/', isAccessable, LinkValidations, validateRequest, createLink);
r.put('/:id', isAccessable, LinkValidations, validateRequest, updateLink);
r.delete('/:id', isAccessable, deleteLink);

export default r;
