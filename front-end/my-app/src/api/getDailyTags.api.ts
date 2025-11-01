import api from "./axios";

export async function getDailyTagsApi(): Promise<string[]> {
  const response = await api.get<string[]>("tag/tags-of-the-day");
  return response.data;
}
