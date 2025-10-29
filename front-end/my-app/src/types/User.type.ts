import type { RoleType } from "./Role.type";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  location: string;
  birthDate: string;
  username: string;
  gender: string;
  role: RoleType;
};
