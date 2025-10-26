import type { Meme } from "./Meme.type";
import type { User } from "./User.type";

export type Comment = {
  id: string;
  content: string;
  memeId: string;
  userId: string;
  createdAt: string;
  meme?: Meme;
  user?: User;
};
 