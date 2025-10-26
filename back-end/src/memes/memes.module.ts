import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeService } from './memes.service';
import { MemesController } from './memes.controller';
import { Meme } from './meme.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CommentService } from 'src/comments/comments.service';
import { VoteService } from 'src/votes/votes.service';
import { Vote } from 'src/votes/vote.entity';
import { Comment } from 'src/comments/comment.entity';
import { TrendingService } from 'src/trendsApi/trends.service';
import { TagService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meme, Comment, Tag, Vote]),
    CloudinaryModule,
  ],
  controllers: [MemesController],
  providers: [
    MemeService,
    CommentService,
    VoteService,
    TrendingService,
    TagService,
  ],
  exports: [MemeService],
})
export class MemeModule {}
