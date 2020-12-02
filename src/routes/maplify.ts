import { Router } from 'express';
import {
  getAllMaplifyDocs,
  createMaplifyDoc,
  deleteMaplifyDoc,
} from '../controllers/maplify';
import isAccessable from '../middlewares/isAccessable';

const router = Router();

router.route('/').get(getAllMaplifyDocs).post(isAccessable, createMaplifyDoc);
router.delete('/:mapID', isAccessable, deleteMaplifyDoc);

export default router;
