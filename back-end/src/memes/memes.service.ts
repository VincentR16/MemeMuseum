import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Meme } from './meme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMemeDto } from './dto/createMeme.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateMemeDto } from './dto/updateMeme.dto';
import { PaginatedMemeResponseDto } from './dto/paginatedMemeResponse.dto';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    imageFile: Express.Multer.File,
    userId: string,
    dto: createMemeDto,
  ): Promise<Meme> {
    const { title, description } = dto;
    if (!imageFile) {
      throw new BadRequestException('No image file provided');
    }
    const uploadResult =
      await this.cloudinaryService.uploadImageToCloudinary(imageFile);

    const meme = this.memeRepository.create({
      title,
      description,
      cloudinaryImageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.public_id,
      userId,
    });

    return await this.memeRepository.save(meme);
  }

  async getMemes(page: number): Promise<PaginatedMemeResponseDto> {
    const limit = 10;
    const skip = (page - 1) * limit;

    const [memes, totalItems] = await this.memeRepository.findAndCount({
      relations: ['user', 'comments'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      memes,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        itemsPerPage: limit,
      },
    };
  }

  async get(id: string): Promise<Meme> {
    const result = await this.memeRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });
    if (!result) throw new NotFoundException('Meme not found');
    return result;
  }

  async delete(id: string, userId: string): Promise<void> {
    const meme = await this.memeRepository.findOne({
      where: { id },
    });

    if (!meme) {
      throw new NotFoundException('Meme not found');
    }

    if (meme.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this meme');
    }

    await this.cloudinaryService.deleteImage(meme.cloudinaryPublicId);

    await this.memeRepository.remove(meme);
  }

  async update(id: string, userId: string, dto: UpdateMemeDto): Promise<Meme> {
    const result = await this.memeRepository.findOne({
      where: { id },
    });
    if (!result) throw new NotFoundException('Meme not found');

    if (result.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this meme');
    }

    Object.assign(result, dto);
    return await this.memeRepository.save(result);
  }
}
