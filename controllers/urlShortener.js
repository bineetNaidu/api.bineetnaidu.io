/* eslint-disable no-unneeded-ternary */
import { nanoid } from 'nanoid';
// eslint-disable-next-line import/extensions
import UrlShortener from '../models/UrlShortener.model.js';

export const getUrlbySlug = async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new Error('No slug was provided');
  const url = await UrlShortener.findOne({ slug });
  res.redirect(url.original_url);
};

export const createShortenUrl = async (req, res) => {
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
};
