import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteType } from 'src/common/types/votes.types';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async create(memeId: string, userId: string): Promise<Vote> {
    const vote = this.voteRepository.create({
      userId,
      memeId,
    });

    return await this.voteRepository.save(vote);
  }

  async voteMeme(
    memeId: string,
    userId: string,
    voteType: VoteType,
  ): Promise<Vote> {
    let vote = await this.voteRepository.findOne({
      where: { memeId, userId },
    });

    if (!vote) {
      vote = await this.create(memeId, userId);
    }

    vote.voteType = voteType;

    return await this.voteRepository.save(vote);
  }

  async getUserVote(memeId: string, userId: string): Promise<Vote | null> {
    return await this.voteRepository.findOne({
      where: { memeId, userId },
    });
  }
}
