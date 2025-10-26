import api from "./axios";

export async function getTagsApi(): Promise<string[]> {
  const response = await api.get<string[]>("tag/by-count");
  return response.data;
}
