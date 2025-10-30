
import type { User } from "../types/User.type";
import api from "./axios";

export async function getMeApi(): Promise<User> {
 
  const response = await api.get<User>("user");
  return response.data;
}
