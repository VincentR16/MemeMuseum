// src/votes/vote.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [VoteService],
  exports: [VoteService],
})
export class VoteModule {}
