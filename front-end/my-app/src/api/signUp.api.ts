import type { RegisterRequest } from "../types/RegisterRequest.type";
import type { User } from "../types/User.type";
import api from "./axios";

export async function signUpApi(data: RegisterRequest) {
  const response = await api.post<User>("/auth/signup", data);
  return response.data;
}
