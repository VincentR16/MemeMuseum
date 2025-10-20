// src/common/pipes/image-file-validation.pipe.ts
import { Injectable } from '@nestjs/common';
import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

@Injectable()
export class ImageFileValidationPipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)$/ }),
      ],
      fileIsRequired: true,
    });
  }
}
