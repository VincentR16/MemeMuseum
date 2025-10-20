// src/memes/meme.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeService } from './memes.service';
import { MemesController } from './memes.controller';
import { Meme } from './meme.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meme]), CloudinaryModule],
  controllers: [MemesController],
  providers: [MemeService],
  exports: [MemeService],
})
export class MemeModule {}
