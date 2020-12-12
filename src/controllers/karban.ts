import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getAllKarbans = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karbans = await Karban.find({});
  res.json({ success: true, karbans });
};

export const createKarban = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, passcode } = req.body;
  const karban = Karban.build(passcode, username);
  await karban.save();
  res.status(201).json({ success: true, karban });
};

export const getKarbanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  res.json({ success: true, karban });
};

export const getKarbanByIdAndCreateNewProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectName, projectDescription } = req.body;
  const karban = await Karban.buildProject(
    req.params.id,
    projectName,
    projectDescription
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};

export const createProjectNewTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tabName } = req.body;
  const karban = await Karban.buildProjectTab(
    req.params.id,
    req.params.projectId,
    tabName
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};

export const createProjectTabNewCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cardBody } = req.body;
  const karban = await Karban.buildProjectTabCard(
    req.params.id,
    req.params.projectId,
    req.params.tabId,
    cardBody
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};

export const deleteKarban = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  await karban.remove();
  res.json({ success: true });
};
