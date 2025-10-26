export const VoteType = {
  NOVOTE: "novote",
  VOTEUP: "upvote",
  VOTEDOWN: "downvote",
} as const;

export type VoteType = (typeof VoteType)[keyof typeof VoteType];
