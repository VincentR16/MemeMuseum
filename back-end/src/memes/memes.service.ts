import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Meme } from './meme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemeDto } from './dto/createMeme.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateMemeDto } from './dto/updateMeme.dto';
import { PaginatedMemeResponseDto } from './dto/paginatedMemeResponse.dto';
import { TrendingService } from 'src/trendsApi/trends.service';
import { TagService } from 'src/tags/tags.service';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly trendingService: TrendingService,
    private readonly tagService: TagService,
  ) {}

  async create(
    imageFile: Express.Multer.File,
    userId: string,
    dto: CreateMemeDto,
  ): Promise<Meme> {
    const { title, description, tags } = dto;

    if (!imageFile) {
      throw new BadRequestException('No image file provided');
    }

    const uploadResult =
      await this.cloudinaryService.uploadImageToCloudinary(imageFile);

    const tagEntities = await this.tagService.findOrCreateTags(tags || []);

    const meme = await this.memeRepository.save({
      title,
      description,
      cloudinaryImageUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      user: { id: userId },
      tags: tagEntities,
    });

    return meme;
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

  async getMemeOftheday(page: number): Promise<PaginatedMemeResponseDto> {
    const limit = 10;
    const skip = (page - 1) * limit;

    const trends = this.trendingService.getDailyKeywords();

    const queryBuilder = this.memeRepository
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.user', 'user')
      .leftJoinAndSelect('meme.comments', 'comments');

    // Costruisci le condizioni OR per ogni trend
    const conditions = trends
      .map((index) => {
        return `(
    LOWER(meme.title) LIKE :trend${index} OR 
    LOWER(meme.description) LIKE :trend${index} OR
    LOWER(meme.tags) LIKE :trend${index}
  )`;
      })
      .join(' OR ');

    // Aggiungi i parametri
    const parameters: Record<string, string> = {};
    trends.forEach((trend, index) => {
      parameters[`trend${index}`] = `%${trend.toLowerCase()}%`;
    });

    queryBuilder.where(conditions, parameters);
    queryBuilder.orderBy('meme.createdAt', 'DESC').skip(skip).take(limit);

    const [memes, totalItems] = await queryBuilder.getManyAndCount();
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
  //! da continuare!! vedere il caso in cui non ci siano meme of the day
  //todo: ricorda questo passaggio

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
