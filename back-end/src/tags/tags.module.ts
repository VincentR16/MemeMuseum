import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';
import { TrendingService } from 'src/trendsApi/trends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, TrendingService],
  exports: [TagService],
})
export class TagModule {}
