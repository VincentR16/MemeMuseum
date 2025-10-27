import api from "./axios";

export async function postMemeApi(data: FormData) {
  const response = await api.post("memes", data);
  return response.data;
}
