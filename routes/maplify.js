/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  createMapData,
  deleteMapData,
  getMapsData,
} from '../controllers/maplify.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = Router();

router
  .route('/')
  .get(asyncWrapper(getMapsData))
  .post(asyncWrapper(createMapData));

router.delete('/:mapID', asyncWrapper(deleteMapData));

export default router;
