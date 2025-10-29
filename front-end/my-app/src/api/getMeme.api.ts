import type { PaginatedMeme } from "../types/paginatedMeme.type";
import api from "./axios";

export async function getMemeApi(page: number): Promise<PaginatedMeme> {
  const response = await api.get<PaginatedMeme>('memes', {
    params: {
      page,
      limit: 5
    }
  });
  return response.data;
}