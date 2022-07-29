import { UserPrivilege } from './types';

// Mongoose Models Names
export const LINKS_MODEL_NAME = 'Link';
export const MAPLIFY_MODEL_NAME = 'Maplify';
export const USER_MODEL_NAME = 'User';

export const AdminUserPrivileges = [
  UserPrivilege.USERS_READ,
  UserPrivilege.USERS_WRITE,
  UserPrivilege.LINKS_READ,
  UserPrivilege.LINKS_WRITE,
  UserPrivilege.LINKS_DELETE,
];

export const NormalUserPrivileges = [UserPrivilege.LINKS_READ];

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
