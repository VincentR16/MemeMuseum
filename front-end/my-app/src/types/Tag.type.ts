import type { Meme } from "./Meme.type";

export type Tag = {
  id: string;
  name: string;
  count: number;
  createdAt: Date;
  memes: Meme[];
};
