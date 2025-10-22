import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeService } from './memes.service';
import { MemesController } from './memes.controller';
import { Meme } from './meme.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CommentService } from 'src/comments/comments.service';
import { VoteService } from 'src/votes/votes.service';
import { Vote } from 'src/votes/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meme, Comment, Vote]), CloudinaryModule],
  controllers: [MemesController],
  providers: [MemeService, CommentService, VoteService],
  exports: [MemeService],
})
export class MemeModule {}
