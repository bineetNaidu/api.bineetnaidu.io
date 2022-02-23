import 'dotenv/config';
import { UserPrivilege } from './types';

// Environment variables
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PROD = process.env.NODE_ENV === 'production';
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Mongoose Models Names
export const LINKS_MODEL_NAME = 'Link';
export const MAPLIFY_MODEL_NAME = 'Maplify';
export const PROJECT_MODEL_NAME = 'Project';
export const USER_MODEL_NAME = 'User';
export const IMAGE_MODEL_NAME = 'Image';

export const AdminUserPrivileges = [
  UserPrivilege.IMAGES_READ,
  UserPrivilege.IMAGES_WRITE,
  UserPrivilege.IMAGES_DELETE,
  UserPrivilege.PROJECTS_READ,
  UserPrivilege.PROJECTS_WRITE,
  UserPrivilege.PROJECTS_DELETE,
  UserPrivilege.USERS_READ,
  UserPrivilege.LINKS_READ,
  UserPrivilege.LINKS_WRITE,
  UserPrivilege.LINKS_DELETE,
];

export const NormalUserPrivileges = [
  UserPrivilege.IMAGES_READ,
  UserPrivilege.PROJECTS_READ,
  UserPrivilege.LINKS_READ,
];

export const PRIVILAGE_KEY = 'privileges';

// Providers Names
export const CLOUDINARY = 'Cloudinary';

export const SCRIPTS_SRC_URLS = [
  'https://stackpath.bootstrapcdn.com/',
  'https://kit.fontawesome.com/',
  'https://cdnjs.cloudflare.com/',
  'https://cdn.jsdelivr.net',
];
export const STYLES_SRC_URLS = [
  'https://kit-free.fontawesome.com/',
  'https://stackpath.bootstrapcdn.com/',
  'https://fonts.googleapis.com/',
  'https://use.fontawesome.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css',
];
export const CONNECT_SRC_URLS = [];
export const FONTS_SRC_URLS = [];
