import type { RegisterRequest } from "../types/RegisterRequest.types";
import type { User } from "../types/User.types";
import api from "./axios";

export async function signUpApi(data: RegisterRequest) {
  const response = await api.post<User>("/auth/signup", data);
  return response.data;
}
