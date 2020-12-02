import { Router } from 'express';
import {
  getUrlPage,
  createNewUrlSlug,
  getUrlbySlugParam,
} from '../controllers/urlShortener';

const router = Router();

router.route('/').get(getUrlPage).post(createNewUrlSlug);
router.get('/:slug', getUrlbySlugParam);

export default router;
