import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Meme } from './meme.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { MemeService } from './memes.service';
import { UserId } from 'src/common/decoretor/userId.decoretor';
import { createMemeDto } from './dto/createMeme.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileValidationPipe } from 'src/common/pipe/image-file-validation-pipe';
import { PaginatedMemeResponseDto } from './dto/paginatedMemeResponse.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UpdateMemeDto } from './dto/updateMeme.dto';
import { CommentService } from 'src/comments/comments.service';
import { CommentDto } from 'src/comments/dto/comment.dto';

@Controller('memes')
export class MemesController {
  constructor(
    private readonly memeService: MemeService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createMeme(
    @UploadedFile(ImageFileValidationPipe) file: Express.Multer.File,
    @UserId() userId: string,
    @Body() dto: createMemeDto,
  ): Promise<Meme> {
    return this.memeService.create(file, userId, dto);
  }

  @Get('memes')
  @UseGuards(ThrottlerGuard)
  getMemes(@Query('page') page: number): Promise<PaginatedMemeResponseDto> {
    return this.memeService.getMemes(page);
  }

  @Get(':Id')
  @UseGuards(JwtAuthGuard)
  getMeme(@Param('Id') id: string): Promise<Meme> {
    return this.memeService.get(id);
  }

  @Delete(':Id')
  @UseGuards(JwtAuthGuard)
  async delete(@UserId() userId: string, @Param('Id') id: string) {
    await this.memeService.delete(id, userId);
    return { message: 'meme delete success' };
  }

  @Patch(':Id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserId() userId: string,
    @Param('Id') id: string,
    @Body() dto: UpdateMemeDto,
  ): Promise<Meme> {
    return this.memeService.update(id, userId, dto);
  }

  @Post(':id')
  createComment(
    @UserId() userId: string,
    @Param('id') memeId: string,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.create(memeId, userId, dto);
  }

  @Get(':id')
  getAllComment(@Param('id') memeId: string) {
    return this.commentService.getAll(memeId);
  }
}
