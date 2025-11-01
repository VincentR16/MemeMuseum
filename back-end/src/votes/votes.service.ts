import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteType } from 'src/common/types/votes.types';
import { Meme } from 'src/memes/meme.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
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

    const oldVoteType = vote?.voteType;

    if (!vote) {
      vote = await this.create(memeId, userId);
    }

    vote.voteType = voteType;

    await this.updateMemeVoteCount(memeId, oldVoteType, voteType);

    return await this.voteRepository.save(vote);
  }

  async getUserVote(memeId: string, userId: string): Promise<Vote | null> {
    return await this.voteRepository.findOne({
      where: { memeId, userId },
    });
  }

  private async updateMemeVoteCount(
    memeId: string,
    oldVoteType: VoteType | undefined,
    newVoteType: VoteType,
  ): Promise<void> {
    const meme = await this.memeRepository.findOne({ where: { id: memeId } });
    if (!meme) throw new NotFoundException('Meme not found');

    if (oldVoteType === VoteType.VOTEUP) {
      meme.votesCount -= 1;
    } else if (oldVoteType === VoteType.VOTEDOWN) {
      meme.votesCount += 1;
    }

    if (newVoteType === VoteType.VOTEUP) {
      meme.votesCount += 1;
    } else if (newVoteType === VoteType.VOTEDOWN) {
      meme.votesCount -= 1;
    }

    await this.memeRepository.save(meme);
  }
}
