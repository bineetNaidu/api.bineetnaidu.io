import { Router } from 'express';
import {
  getAllMaplifyDocs,
  createMaplifyDoc,
  deleteMaplifyDoc,
} from '../controllers/maplify';

const router = Router();

router.route('/').get(getAllMaplifyDocs).post(createMaplifyDoc);
router.delete('/:mapID', deleteMaplifyDoc);

export default router;
