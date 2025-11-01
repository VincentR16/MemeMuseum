import type { Comment } from "../types/Comment.type";
import api from "./axios";

export async function getCommentsApi(memeId: string): Promise<Comment[]> {
  const response = await api.get<Comment[]>(`memes/${memeId}/comments`);
  return response.data;
}
    