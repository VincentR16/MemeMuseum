import type { LoginRequest } from "../types/LoginRequest.type";
import type { User } from "../types/User.type";

import api from "./axios";

export async function loginApi(data: LoginRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}
