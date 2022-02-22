import { v2 } from 'cloudinary';
import {
  CLOUDINARY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  PROD,
} from 'src/shared/constants';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  },
};

export const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    folder: PROD ? 'api.bineetnaidu.io/prod' : 'api.bineetnaidu.io/local',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});
