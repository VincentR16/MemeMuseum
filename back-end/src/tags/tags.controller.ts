import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tags.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Tag } from './tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('by-count')
  @UseGuards(JwtAuthGuard)
  getByCount(): Promise<string[]> {
    return this.tagService.getByCount();
  }

  @Get('by-creation')
  @UseGuards(JwtAuthGuard)
  getByCreation(): Promise<Tag[]> {
    return this.tagService.getByCreation();
  }

  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('name') name: string) {
    await this.tagService.delete(name);
  }

  @Get('tags-of-the-day')
  getDailyTags(): string[] {
    return this.tagService.getDailyTags();
  }
}
