import type { CommentRequest } from "../types/CommentRequest";
import api from "./axios";

export async function postCommentApi(memeId: string, dto: CommentRequest) {
  const response = await api.post(`memes/${memeId}/comments`, dto);
  return response.data;
}
