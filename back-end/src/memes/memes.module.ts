// src/memes/meme.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeService } from './memes.service';
import { MemesController } from './memes.controller';
import { Meme } from './meme.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CommentService } from 'src/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meme, Comment]), CloudinaryModule],
  controllers: [MemesController],
  providers: [MemeService, CommentService],
  exports: [MemeService],
})
export class MemeModule {}
