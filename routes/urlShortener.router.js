/* eslint-disable import/extensions */
import { Router } from 'express';
import { createShortenUrl, getUrlbySlug } from '../controllers/urlShortener.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = Router();

router.post('/', asyncWrapper(createShortenUrl));
router.get('/:slug', asyncWrapper(getUrlbySlug));

export default router;
