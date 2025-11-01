import type { PaginatedMeme } from "../types/paginatedMeme.type";
import api from "./axios";

interface SearchMemesParams {
  page: number;
  limit?: number;
  userId?: string;
}

export async function getDailyMemesApi({
  page,
  limit = 10,
  userId,
}: SearchMemesParams): Promise<PaginatedMeme> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (userId) {
    params.append("userId", userId);
  }

  const response = await api.get(`memes/memes-of-the-day?${params}`);
  return response.data;
}
