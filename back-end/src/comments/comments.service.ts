import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    memeId: string,
    userId: string,
    dto: CommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: dto.content,
      memeId,
      userId,
    });
    return await this.commentRepository.save(comment);
  }

  async getAll(memeId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { memeId },
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });
  }

  async update(id: string, userId: string, dto: CommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.userId !== userId)
      throw new ForbiddenException('User cannot edit the comment');

    comment.content = dto.content;

    return await this.commentRepository.save(comment);
  }

  async delete(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.userId !== userId)
      throw new ForbiddenException('User cannot delete the comment');

    await this.commentRepository.remove(comment);
  }
}
