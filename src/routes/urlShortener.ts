import { Router } from 'express';
import { nanoid } from 'nanoid';
import UrlShortener from '../models/UrlShortener';

const router = Router();

router.get('/', (req, res) => res.json({ welcome_to: 'URL SHORTENER' }));

router.post('/', async (req, res) => {
  const { url, slug } = req.body;
  if (!url) throw new Error('Please Provide with url to create shorten url');
  const newSlug = nanoid(10);
  const newShortenUrl = new UrlShortener({
    original_url: url,
    slug: slug ? slug : newSlug,
  });
  await newShortenUrl.save();
  res.status(200).json({
    url: newShortenUrl,
    success: true,
  });
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new Error('No slug was provided');
  const url = await UrlShortener.findOne({ slug });
  if (!url) throw new Error('No URL was found with the give slug');
  res.json(url);
});

export default router;
