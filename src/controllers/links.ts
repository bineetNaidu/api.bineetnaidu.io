import { Request, Response } from 'express';
import { body } from 'express-validator';
import BadRequestError from '../utils/errors/BadRequestError';
import Link from '../models/Link';

export const LinkValidations = [
  body('label')
    .not()
    .isEmpty()
    .withMessage('Label cannot be empty')
    .isString()
    .withMessage('Label must be a string')
    .trim()
    .escape(),
  body('url')
    .not()
    .isEmpty()
    .withMessage('URL cannot be empty')
    .isURL()
    .withMessage('URL must be a valid URL')
    .trim(),
  body('icon')
    .not()
    .isEmpty()
    .withMessage('Icon cannot be empty')
    .trim()
    .escape(),
];

export const createLink = async (req: Request, res: Response) => {
  const { label, icon, url } = req.body;

  const link = await Link.build({
    label,
    icon,
    url,
  }).save();

  res.status(201).json({
    data: link,
    created: !!link,
  });
};

export const getAllLinks = async (_req: Request, res: Response) => {
  const links = await Link.find({});
  res.json({
    data: links,
    success: true,
    length: links.length,
  });
};

export const updateLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { label, icon, url } = req.body;

  const link = await Link.findById(id);

  if (!link) {
    throw new BadRequestError('Link was not found!');
  }

  link.set({
    label,
    icon,
    url,
  });

  const updatedLink = await link.save();
  res.json({
    data: updatedLink,
    updated: !!updatedLink,
  });
};

export const deleteLink = async (req: Request, res: Response) => {
  const { id } = req.params;

  const link = await Link.findById(id);

  if (!link) {
    throw new BadRequestError('Link was not found!');
  }

  await link.remove();
  res.json({
    deleted: !!link,
    deleted_link_id: link.id,
  });
};
