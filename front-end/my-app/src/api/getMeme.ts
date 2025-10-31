import type { Meme } from "../types/Meme.type";
import api from "./axios";

export async function getMemeByIdApi(
  id: string,
  userId?: string
): Promise<Meme> {
  const response = await api.get<Meme>(`memes/${id}`, {
    params: { userId },
  });

  return response.data;
}
