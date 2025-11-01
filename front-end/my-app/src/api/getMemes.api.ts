import type { PaginatedMeme } from "../types/paginatedMeme.type";
import api from "./axios";

export async function getMemesApi(
  page: number,
  userId?: string,
  sortBy: "date" | "votes" = "date"
): Promise<PaginatedMeme> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "3",
    sortBy: sortBy,
  });

  if (userId) {
    params.append("userId", userId);
  }

  const response = await api.get(`memes?${params}`);
  return response.data;
}
