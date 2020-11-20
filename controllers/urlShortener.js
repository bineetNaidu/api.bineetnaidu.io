/* eslint-disable no-unneeded-ternary */
import { nanoid } from 'nanoid';
// eslint-disable-next-line import/extensions
import UrlShortener from '../models/UrlShortener.model.js';

export const getUrlbySlug = async (req, res) => {
  const { slug } = req.params;
  const url = await UrlShortener.findOne({ slug });
  res.status(200).json({
    url: url.original_url,
    success: true,
  });
};

export const createShortenUrl = async (req, res) => {
  const { url, slug } = req.body;
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
