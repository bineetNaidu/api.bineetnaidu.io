import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getAllKarbans = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karbans = await Karban.find({});
  res.json({ success: true, karbans });
};

export const findAKarbanWithUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { passcode } = req.body;
  if (!passcode) throw new Error('Passcode must be given');
  if (!req.query.username) {
    throw new Error('Username must be given');
  }
  const karban = await Karban.findOne({
    username: req.query.username.toString(),
  });
  if (!karban) throw new Error('karban not Found with the given Usernmae');
  const isMatch = karban.passcode === passcode;
  if (!isMatch) throw new Error('UnAuhtorized');
  res.json({ success: true, karban });
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

export const deleteKarbanProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const filteredKarban = karban.projects.filter(
    (p) => p.projectId !== req.params.projectId
  );
  karban.projects = filteredKarban;
  await karban.save();
  res.json({ success: true, karban });
};

export const deleteKarbanProjectTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const project = karban.projects.find(
    (p) => p.projectId === req.params.projectId
  );
  if (!project) throw new Error('Karban Project Not Found');
  const filteredKarbanProjectTabs = project.tabs.filter(
    (t) => t.tabId !== req.params.tabId
  );
  project.tabs = filteredKarbanProjectTabs;
  await karban.save();
  res.json({ success: true, karban });
};

export const deleteKarbanProjectTabCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const project = karban.projects.find(
    (p) => p.projectId === req.params.projectId
  );
  if (!project) throw new Error('Karban Project Not Found');
  const tab = project.tabs.find((t) => t.tabId === req.params.tabId);
  if (!tab) throw new Error('Karban Project Tab Not Found');
  const filterKarbanProjectCards = tab.cards.filter(
    (c) => c.cardId !== req.params.cardId
  );
  tab.cards = filterKarbanProjectCards;
  await karban.save();
  res.json({ success: true, karban });
};
