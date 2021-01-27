import { Response, Request } from 'express';
import { nanoid } from 'nanoid';
import UrlShortener from '../models/UrlShortener';

export const getUrlPage = (req: Request, res: Response) => {
  res.json({ welcome_to: 'URL SHORTENER' });
};

export const createNewUrlSlug = async (req: Request, res: Response) => {
  const { url, slug } = req.body;
  if (!url) throw new Error('Please Provide with url to create shorten url');
  if (slug) {
    const slugExists = await UrlShortener.find({ slug });
    if (slugExists) {
      throw new Error('Duplicate Slug Provided, A Slug must be unique!');
    }
  }
  const newSlug = nanoid(10);
  const newShortenUrl = UrlShortener.build({
    original_url: url,
    slug: slug || newSlug,
  });
  await newShortenUrl.save();
  res.status(200).json({
    url: newShortenUrl,
    success: true,
  });
};

export const getUrlbySlugParam = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) throw new Error('No slug was provided');
  const url = await UrlShortener.findOne({ slug });
  if (!url) throw new Error('No URL was found with the give slug');
  res.redirect(url.original_url);
};
