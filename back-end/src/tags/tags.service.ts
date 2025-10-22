import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (tag) throw new BadRequestException('Tag name already exists');

    const newTag = this.tagRepository.create({
      name,
      count: 1,
    });

    return await this.tagRepository.save(newTag);
  }

  async get(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async getByCount(): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      order: {
        count: 'DESC',
      },
    });

    return tags;
  }

  async getByCreation(): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return tags;
  }

  async incrementCount(name: string): Promise<Tag> {
    const tag = await this.get(name);

    tag.count = tag.count++;
    return await this.tagRepository.save(tag);
  }

  async decrementCount(name: string): Promise<Tag> {
    const tag = await this.get(name);

    tag.count = tag.count--;
    return await this.tagRepository.save(tag);
  }

  async delete(name: string) {
    const tag = await this.get(name);

    if (tag.count !== 0) throw new BadRequestException('Tag count is not 0');
    await this.tagRepository.remove(tag);
  }
}
