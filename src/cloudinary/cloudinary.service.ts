import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Image } from 'src/images/models/image.model';

@Injectable()
export class CloudinaryService {
  async removeImage(image: Image): Promise<boolean> {
    try {
      await v2.uploader.destroy(image.filename);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
