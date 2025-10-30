
import type { Vote } from "../types/Vote.type";
import api from "./axios";

export async function upvoteMemeApi(memeId: string): Promise<Vote> {
  const response = await api.post(`memes/${memeId}/upvote`);
  return response.data;
}

export async function downvoteMemeApi(memeId: string): Promise<Vote> {
  const response = await api.post(`memes/${memeId}/downvote`);
  return response.data;
}
