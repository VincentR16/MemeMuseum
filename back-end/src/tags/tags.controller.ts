import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tags.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post()
  create(@Body() dto: TagDto): Promise<Tag> {
    return this.tagService.create(dto.name);
  }

  @Get('by-count')
  getByCount(): Promise<Tag[]> {
    return this.tagService.getByCount();
  }

  @Get('by-creation')
  getByCreation(): Promise<Tag[]> {
    return this.tagService.getByCreation();
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    await this.tagService.delete(name);
  }
}
