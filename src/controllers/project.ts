import { Response, Request } from 'express';
import Project from '../models/Project';

export const getAllProjects = async (req: Request, res: Response) => {
  let projects;

  if (req.params.featured) {
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

export const getProjectByID = () => null;
