import { Meme } from '../meme.entity';

export class PaginatedMemeResponseDto {
  memes: Meme[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
