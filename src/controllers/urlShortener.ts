import { Response, Request } from 'express';
import { nanoid } from 'nanoid';
import UrlShortener from '../models/UrlShortener';

export const getUrlPage = (req: Request, res: Response) => {
  res.json({ welcome_to: 'URL SHORTENER' });
};

export const createNewUrlSlug = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) throw new Error('Please Provide with url to create shorten url');

  let urlStnr;

  urlStnr = await UrlShortener.findOne({ original_url: url });

  if (!urlStnr) {
    const newSlug = nanoid(10);
    console.log("Doesn't Exist!");
    urlStnr = UrlShortener.build({
      original_url: url,
      slug: newSlug,
    });
    await urlStnr.save();
  }

  res.status(200).json({
    url: urlStnr,
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
