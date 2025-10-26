import type { Tag } from "./Tag.type";
import type { User } from "./User.type";
import type { Vote } from "./Vote.type";

export type Meme = {
  id: string;
  title: string;
  description?: string;
  cloudinaryImageUrl: string;
  cloudinaryPublicId: string;
  votes: Vote[];
  votesCount: number;
  createdAt: Date;
  user?: User;
  userId: string;
  comments: Comment[];
  tags: Tag[];
};
