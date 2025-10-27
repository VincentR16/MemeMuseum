import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream'; // Import Node.js stream

@Injectable()
export class CloudinaryService {
  async uploadImageToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File buffer is empty');
    }

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: 'meme',
          resource_type: 'image',
          transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            reject(new BadRequestException(`Upload failed: ${error.message}`));
          } else if (!result) {
            reject(new BadRequestException('Upload result is undefined'));
          } else {
            resolve(result);
          }
        },
      );
      const bufferStream = Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await v2.uploader.destroy(publicId);
    } catch (error) {
      throw new BadRequestException(`Failed to delete image: ${error}`);
    }
  }

  getOptimizedUrl(publicId: string, width?: number, height?: number): string {
    return v2.url(publicId, {
      width: width || 500,
      height: height || 500,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    });
  }
}
