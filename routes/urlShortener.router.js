/* eslint-disable import/extensions */
import { Router } from 'express';
import { createShortenUrl, getUrlbySlug } from '../controllers/urlShortener.js';
import { validateUrlShortenerSchema } from '../middlewares/index.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = Router();

router.get('/', (_, res) => res.render('urlshortener'));
router.post('/', validateUrlShortenerSchema, asyncWrapper(createShortenUrl));
router.get('/:slug', asyncWrapper(getUrlbySlug));

export default router;
