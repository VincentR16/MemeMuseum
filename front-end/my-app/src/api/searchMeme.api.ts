import type { PaginatedMeme } from "../types/paginatedMeme.type";
import api from "./axios";

interface SearchMemesParams {
  page: number;
  limit?: number;
  tags?: string; 
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: "date" | "votes";
}

export async function searchMemesApi({
  page,
  limit = 3,
  tags,
  userId,
  dateFrom,
  dateTo,
  sortBy = "date",
}: SearchMemesParams): Promise<PaginatedMeme> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy: sortBy,
  });

  if (tags && tags.trim().length > 0) {
    params.append("tags", tags);
  }

  if (userId) {
    params.append("userId", userId);
  }

  if (dateFrom) {
    params.append("dateFrom", dateFrom.toISOString());
  }

  if (dateTo) {
    params.append("dateTo", dateTo.toISOString());
  }

  const response = await api.get(`memes/search?${params}`);
  return response.data;
}