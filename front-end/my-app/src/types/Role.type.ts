export const RoleTypeEnum = {
  USER: "user",
  MODERATOR: "moderator",
  ADMIN: "admin",
} as const;

export type RoleType = (typeof RoleTypeEnum)[keyof typeof RoleTypeEnum];
