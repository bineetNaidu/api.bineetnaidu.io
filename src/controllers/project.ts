import { Response, Request } from 'express';
import Project, { Status } from '../models/Project';

export const getAllProjects = async (req: Request, res: Response) => {
  let projects;

  if (req.query.featured) {
    projects = await Project.find({
      featured: true,
    });
  } else {
    projects = await Project.find({});
  }

  res.json({
    data: projects,
    success: true,
    length: projects.length,
  });
};

export const getProjectByID = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) throw new Error('Project Not Found');

  res.json({
    data: project,
    success: true,
    length: 1,
  });
};

export const createProject = async (req: Request, res: Response) => {
  // eslint-disable-next-line object-curly-newline
  const { name, url, github, featured, description, status } = req.body;

  const project = Project.build({
    name,
    description,
    url: url || undefined,
    github: github || undefined,
    featured: featured || false,
    status: status || Status.Planning,
  });
  await project.save();
  res.json({
    data: project,
    success: true,
    length: 1,
    created: true,
  });
};

export const updateProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndUpdate(projectId, req.body);
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project Not Found');

  res.json({
    data: project,
    success: true,
    length: 1,
    updated: true,
  });
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) throw new Error('Project Not Found');

  await project.remove();

  res.json({
    data: project,
    success: true,
    length: 1,
    removed: true,
  });
};
