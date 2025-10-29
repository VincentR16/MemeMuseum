import type { Meme } from "./Meme.type";

export type PaginatedMeme = {
  memes: Meme[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
