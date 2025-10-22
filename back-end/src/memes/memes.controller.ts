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
import { VoteService } from 'src/votes/votes.service';
import { VoteType } from 'src/common/types/votes.types';

@Controller('memes')
export class MemesController {
  constructor(
    private readonly memeService: MemeService,
    private readonly commentService: CommentService,
    private readonly voteService: VoteService,
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

  @Post(':id/upvote')
  async upvoteMeme(@Param('id') memeId: string, @UserId() userId: string) {
    return await this.voteService.voteMeme(memeId, userId, VoteType.VOTEUP);
  }

  @Post(':id/downvote')
  async downvoteMeme(@Param('id') memeId: string, @UserId() userId: string) {
    return await this.voteService.voteMeme(memeId, userId, VoteType.VOTEDOWN);
  }

  @Post(':id/remove-vote')
  async removeVoteMeme(@Param('id') memeId: string, @UserId() userId: string) {
    return await this.voteService.voteMeme(memeId, userId, VoteType.NOVOTE);
  }

  @Get(':id/my-vote')
  async getMyVote(@Param('id') memeId: string, @UserId() userId: string) {
    return await this.voteService.getUserVote(memeId, userId);
  }
}
