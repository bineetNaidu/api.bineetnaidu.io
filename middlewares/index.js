/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import urlShortenerSchema from '../utils/validations/urlShortener.js';

export const validateUrlShortenerSchema = (req, res, next) => {
  const { error } = urlShortenerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new Error(msg);
  }
  next();
};
