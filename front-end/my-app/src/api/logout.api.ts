import api from "./axios";

export async function logoutApi() {
  const response = await api.post("/auth/logout");
  return response;
}
