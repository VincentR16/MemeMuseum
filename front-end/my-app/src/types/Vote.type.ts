import type { Meme } from "./Meme.type";
import type { User } from "./User.type";
import type { VoteType } from "./VoteTypesEnum.type";

export type Vote = {
  id: string;
  user?: User;
  userId: string;
  meme?: Meme;
  memeId: string;
  voteType: VoteType;
  createdAt: Date;
}

