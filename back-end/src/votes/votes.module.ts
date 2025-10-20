// src/votes/vote.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
})
export class VoteModule {}
