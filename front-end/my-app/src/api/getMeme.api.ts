import type { PaginatedMeme } from "../types/paginatedMeme.type";
import api from "./axios";

export async function getMemeApi(
  page: number,
  userId?: string
): Promise<PaginatedMeme> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  });

  if (userId) {
    params.append("userId", userId);
  }

  const response = await api.get(`memes?${params}`);
  return response.data;
}
