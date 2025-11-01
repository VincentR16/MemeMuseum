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
import { Console } from 'console';

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

  async searchMemesByTags(
    tagNames: string[],
    page: number,
    limit: number,
    userId?: string,
    dateFrom?: Date,
    dateTo?: Date,
    sortBy: 'date' | 'votes' = 'date',
  ): Promise<PaginatedMemeResponseDto> {
    const hasTagSearch = tagNames && tagNames.length > 0;
    const hasDateSearch = dateFrom || dateTo;

    if (!hasTagSearch && !hasDateSearch) {
      throw new Error(
        'Almeno un criterio di ricerca deve essere specificato: tag o intervallo di date',
      );
    }

    const skip = (page - 1) * limit;
    const queryBuilder = this.memeRepository
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.user', 'user')
      .leftJoinAndSelect('meme.comments', 'comments')
      .leftJoinAndSelect('meme.tags', 'tags');

    if (userId) {
      queryBuilder.leftJoinAndSelect(
        'meme.votes',
        'userVote',
        'userVote.userId = :userId',
        { userId },
      );
    }

    // AND logic: il meme deve avere TUTTI i tag
    if (hasTagSearch) {
      tagNames.forEach((tagName, index) => {
        queryBuilder.innerJoin(
          'meme.tags',
          `tag${index}`,
          `LOWER(tag${index}.name) = :tagName${index}`,
          { [`tagName${index}`]: tagName.toLowerCase() },
        );
      });
    }

    if (dateFrom) {
      queryBuilder.andWhere('meme.createdAt >= :dateFrom', { dateFrom });
    }
    if (dateTo) {
      queryBuilder.andWhere('meme.createdAt <= :dateTo', { dateTo });
    }

    if (sortBy === 'votes') {
      queryBuilder.orderBy('meme.votesCount', 'DESC');
    } else {
      queryBuilder.orderBy('meme.createdAt', 'DESC');
    }

    const [memes, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);
    return {
      memes,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        itemsPerPage: limit,
      },
    };
  }

  async getMemes(
    page: number,
    limit: number,
    userId?: string,
    sortBy: 'date' | 'votes' = 'date',
  ): Promise<PaginatedMemeResponseDto> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.memeRepository
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.user', 'user')
      .leftJoinAndSelect('meme.comments', 'comments')
      .leftJoinAndSelect('meme.tags', 'tags');

    if (userId) {
      queryBuilder.leftJoinAndSelect(
        'meme.votes',
        'userVote',
        'userVote.userId = :userId',
        { userId },
      );
    }

    if (sortBy === 'votes') {
      queryBuilder.orderBy('meme.votesCount', 'DESC');
    } else {
      queryBuilder.orderBy('meme.createdAt', 'DESC');
    }

    const [memes, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

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

  async getMemeOftheday(
    page: number,
    limit: number,
  ): Promise<PaginatedMemeResponseDto> {
    const skip = (page - 1) * limit;

    const trends = this.trendingService.getDailyKeywords();

    const queryBuilder = this.memeRepository
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.user', 'user')
      .leftJoinAndSelect('meme.comments', 'comments');

    const conditions = trends
      .map((index) => {
        return `(
    LOWER(meme.title) LIKE :trend${index} OR 
    LOWER(meme.description) LIKE :trend${index} OR
    LOWER(meme.tags) LIKE :trend${index}
  )`;
      })
      .join(' OR ');

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

  async get(id: string, userId?: string): Promise<Meme> {
    const queryBuilder = this.memeRepository
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.user', 'user')
      .leftJoinAndSelect('meme.comments', 'comments')
      .leftJoinAndSelect('meme.tags', 'tags')
      .where('meme.id = :id', { id });

    if (userId) {
      queryBuilder.leftJoinAndSelect(
        'meme.votes',
        'userVote', // ✅ Stesso alias di getMemes
        'userVote.userId = :userId',
        { userId },
      );
    }

    const meme = await queryBuilder.getOne();

    if (!meme) {
      throw new NotFoundException('Meme not found');
    }

    return meme;
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
