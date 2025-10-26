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

  async findOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    if (!tagNames || tagNames.length === 0) {
      return [];
    }

    const tags = await Promise.all(
      tagNames.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });

        if (tag) {
          tag.count += 1;
          await this.tagRepository.save(tag);
        } else {
          tag = await this.tagRepository.save({ name, count: 1 });
        }

        return tag;
      }),
    );

    return tags;
  }

  async get(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async getByCount(): Promise<string[]> {
    const tags = await this.tagRepository.find({
      select: ['name'],
      order: {
        count: 'DESC',
      },
    });

    return tags.map((tag) => tag.name);
  }

  async getByCreation(): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return tags;
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
